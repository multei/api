const bodyParser = require("body-parser");
const Debug = require("debug");
const express = require("express");
const openALPR = require('openalpr/dist/express-middleware')
const router = express.Router();
const { read } = require("../../../services/db");
const { saveInitializedComplaint, finishComplaint, retrieveAllComplaints, retrieveComplaintByCarPlate } = require("../../../domain/complaint/complaint.domain");
const { CanNotSaveDataException, NoComplaintsFoundException, CanNotRetrieveParkingDataException, DeletingComplaintNotAllowedException } = require("../../../domain/complaint/complaint.exceptions");


const googleCloudStorage = require('../../../middlewares/googleCloudStorage')
const multerUpload = require("../../../middlewares/multerUpload");

const debug = Debug("app:api:routes:v1:parkings");
debug("On /v1/parkings/index.js file");

router.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

/**
 * GET /v1/parkings
 *
 * Retrieve a list of complaints
 */
router.get("/", bodyParser.json(), async function (req, res, next) {
  const handleSuccess = (data) => {
    res.status(200).json({ status: "success", data: { parkings: data } });
  };
  const handleError = (error) => {
    next(CanNotRetrieveParkingDataException());
  };

  retrieveAllComplaints(handleSuccess, handleError)
});

/**
 * GET /v1/parkings/:car_plate
 *
 * Retrieve illegal parkings for a specific car plate
 */
router.get("/:car_plate", async function (req, res, next) {
  const car_plate = req.params["car_plate"];

  const handleSuccess = (data) => {

    if (data.length === 0) {
      return next(NoComplaintsFoundException());
    }

    res.status(200).json({ status: "success", data: { parkings: data } });
  };

  const handleError = (error) => {
    return next(CanNotRetrieveParkingDataException());
  };

  retrieveComplaintByCarPlate(car_plate, handleSuccess, handleError)
});

/**
 * POST /v1/parkings
 */
router.post(
  "/",
  [
    multerUpload.fields([{ name: "car_front_photo", maxCount: 1 }]),
    openALPR("car_front_photo"),
    googleCloudStorage.uploadFile("car_front_photo"),
  ],
  async function (req, res, next) {
    const data = createComplaintObject(req);

    const handleSuccess = (response) => {
      res.status(200).json({
        status: "success",
        data: { uuid: response[0], parkings: data },
      });
    };
    const handleError = (error) => {
      next(CanNotSaveDataException());
    };

    saveInitializedComplaint(data, res, handleSuccess, handleError);
  }
);

/**
 * PATCH /v1/parkings/
 */
router.patch("/", bodyParser.json(), async (req, res, next) => {
  const { uuid, coordinates } = req.body;

  finishComplaint(uuid, coordinates)
    .then(() => {
      res.status(200).json({
        status: "success",
        data: { uuid: uuid, coordinates: coordinates },
      });
    })
    .catch((error) => {
      next(error);
    });
});

/**
 * DELETE /v1/parkings/:car_plate
 *
 * Can not delete a illegal parking
 */
router.delete("/:param", bodyParser.json(), async (req, res, next) => {
  next(DeletingComplaintNotAllowedException());
});

function createComplaintObject(req) {
  const { files, recognitionData } = req;
  const { car_front_photo } = recognitionData;
  const {
    plate,
    vehicle: { color, make, make_model },
  } = recognitionData["car_front_photo"].results[0];

  return {
    ...req.body,
    car_color: color[0].name,
    car_front_photo_uri: files["car_front_photo"].cloudStoragePublicUrl,
    car_front_photo_recognition_data: car_front_photo,
    car_make: make[0].name,
    car_make_model: make_model[0].name,
    car_plate: plate,
  };
}

module.exports = router;
