module.exports = (fileIndex) => async (req, res, next) => {
  req.recognitionData = {
    "car_front_photo": {
      "data_type": "alpr_results",
      "epoch_time": 1592843710362,
      "processing_time": {
        "total": 140.58199999999488,
        "plates": 60.55210876464844,
        "vehicles": 74.57900000008522
      },
      "img_height": 675,
      "img_width": 1200,
      "results": [
        {
          "plate": "FUM2296",
          "confidence": 94.45771789550781,
          "region_confidence": 30,
          "vehicle_region": {
            "y": 97,
            "x": 205,
            "height": 481,
            "width": 672
          },
          "region": "ca",
          "plate_index": 0,
          "processing_time_ms": 8.373038291931152,
          "candidates": [
            {
              "matches_template": 0,
              "plate": "FUM2296",
              "confidence": 94.45771789550781
            }
          ],
          "coordinates": [
            {
              "y": 418,
              "x": 548
            },
            {
              "y": 410,
              "x": 701
            },
            {
              "y": 458,
              "x": 702
            },
            {
              "y": 467,
              "x": 548
            }
          ],
          "vehicle": {
            "orientation": [
              {
                "confidence": 59.5528678894043,
                "name": "0"
              },
              {
                "confidence": 30.48238754272461,
                "name": "45"
              },
              {
                "confidence": 9.01399040222168,
                "name": "315"
              },
              {
                "confidence": 0.24999484419822693,
                "name": "135"
              },
              {
                "confidence": 0.24927780032157898,
                "name": "225"
              },
              {
                "confidence": 0.1890365481376648,
                "name": "90"
              },
              {
                "confidence": 0.16976287961006165,
                "name": "270"
              },
              {
                "confidence": 0.062162064015865326,
                "name": "missing"
              },
              {
                "confidence": 0.03052421659231186,
                "name": "180"
              }
            ],
            "color": [
              {
                "confidence": 92.87230682373047,
                "name": "silver-gray"
              },
              {
                "confidence": 6.2270307540893555,
                "name": "white"
              },
              {
                "confidence": 0.3325773775577545,
                "name": "gold-beige"
              },
              {
                "confidence": 0.19996210932731628,
                "name": "black"
              },
              {
                "confidence": 0.1264607161283493,
                "name": "blue"
              },
              {
                "confidence": 0.10023347288370132,
                "name": "yellow"
              },
              {
                "confidence": 0.060724351555109024,
                "name": "pink"
              },
              {
                "confidence": 0.034267961978912354,
                "name": "brown"
              },
              {
                "confidence": 0.01847480982542038,
                "name": "red"
              },
              {
                "confidence": 0.01681172288954258,
                "name": "green"
              }
            ],
            "make": [
              {
                "confidence": 99.96148681640625,
                "name": "toyota"
              },
              {
                "confidence": 0.010361667722463608,
                "name": "scion"
              },
              {
                "confidence": 0.005845377221703529,
                "name": "honda"
              },
              {
                "confidence": 0.005219229497015476,
                "name": "volkswagen"
              },
              {
                "confidence": 0.0019618587102741003,
                "name": "acura"
              },
              {
                "confidence": 0.001329611404798925,
                "name": "nissan"
              },
              {
                "confidence": 0.00113096262793988,
                "name": "mg"
              },
              {
                "confidence": 0.001031298190355301,
                "name": "chevrolet"
              },
              {
                "confidence": 0.00102839688770473,
                "name": "renault"
              },
              {
                "confidence": 0.0009504877962172031,
                "name": "lexus"
              }
            ],
            "body_type": [
              {
                "confidence": 95.17434692382812,
                "name": "sedan-standard"
              },
              {
                "confidence": 3.2406954765319824,
                "name": "taxi"
              },
              {
                "confidence": 0.8874870538711548,
                "name": "sedan-compact"
              },
              {
                "confidence": 0.33779388666152954,
                "name": "suv-crossover"
              },
              {
                "confidence": 0.24694928526878357,
                "name": "suv-standard"
              },
              {
                "confidence": 0.030228059738874435,
                "name": "van-mini"
              },
              {
                "confidence": 0.028425026684999466,
                "name": "tractor-trailer"
              },
              {
                "confidence": 0.01178197655826807,
                "name": "sedan-wagon"
              },
              {
                "confidence": 0.011401831172406673,
                "name": "motorcycle"
              },
              {
                "confidence": 0.009855885989964008,
                "name": "sedan-sports"
              }
            ],
            "year": [
              {
                "confidence": 60.999332427978516,
                "name": "2015-2019"
              },
              {
                "confidence": 38.9268684387207,
                "name": "2010-2014"
              },
              {
                "confidence": 0.03835480660200119,
                "name": "2005-2009"
              },
              {
                "confidence": 0.01105866301804781,
                "name": "2000-2004"
              },
              {
                "confidence": 0.010643595829606056,
                "name": "1995-1999"
              },
              {
                "confidence": 0.006233681924641132,
                "name": "1990-1994"
              },
              {
                "confidence": 0.003293404821306467,
                "name": "1980-1984"
              },
              {
                "confidence": 0.002935265889391303,
                "name": "1985-1989"
              },
              {
                "confidence": 0.0012811199994757771,
                "name": "missing"
              }
            ],
            "make_model": [
              {
                "confidence": 81.2051010131836,
                "name": "toyota_corolla"
              },
              {
                "confidence": 13.35890007019043,
                "name": "toyota_camry"
              },
              {
                "confidence": 2.185037612915039,
                "name": "toyota_le"
              },
              {
                "confidence": 0.5600442886352539,
                "name": "toyota_avensis"
              },
              {
                "confidence": 0.4370264708995819,
                "name": "toyota_avalon"
              },
              {
                "confidence": 0.17097343504428864,
                "name": "toyota_prius"
              },
              {
                "confidence": 0.16899821162223816,
                "name": "toyota_venza"
              },
              {
                "confidence": 0.15616048872470856,
                "name": "toyota_aurion"
              },
              {
                "confidence": 0.12161402404308319,
                "name": "toyota_yaris"
              },
              {
                "confidence": 0.10531675070524216,
                "name": "scion_im"
              }
            ]
          },
          "matches_template": 0,
          "requested_topn": 10
        }
      ],
      "credits_monthly_used": 10,
      "version": 2,
      "credits_monthly_total": 50,
      "error": false,
      "image_bytes_prefix": "data:image/jpeg;base64,",
      "regions_of_interest": [
        {
          "y": 0,
          "x": 0,
          "height": 675,
          "width": 1200
        }
      ],
      "credit_cost": 1
    }
  }

  next()
}