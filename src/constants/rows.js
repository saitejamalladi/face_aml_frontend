export const ROWS = [
  {
    hit_id: 1,
    name_matched: "Abdur REHMAN",
    name_confidence: "0.909",
    face_found: false,
    rosetteResponse: [
      {
        score: 0.9090282,
        resultFields: {
          name: "Abdur REHMAN",
          alias: "Abdul Rehman",
          open_sanction_id: "NK-WuX9jdaAREQnYKtF89FB5S",
        },
        queryFields: [
          {
            field: "name",
            value: "Abdul Rahman",
          },
          {
            field: "alias",
            value: "Abdul Rahman",
          },
        ],
        searchExplanation: {
          score: 0.9090282,
          fieldScores: [
            {
              fieldName: "name",
              weight: 0.10000000149011612,
              score: 0.873206377029419,
              fieldValue: "abdur rehman",
              errorMessage: "",
            },
            {
              fieldName: "alias",
              weight: 0.10000000149011612,
              score: 0.9448499083518982,
              fieldValue: "abdul rehman",
              errorMessage: "",
            },
          ],
        },
      },
    ],
  },
  {
    face_match_score: 0.7468411922454834,
    hit_id: 2,
    name_matched: "Abdul Rahman YASIN",
    name_confidence: "0.880",
    face_found: true,
    rosetteResponse: [
      {
        score: 0.880162,
        resultFields: {
          name: "Abdul Rahman YASIN",
          alias: "abdul asin rahman",
          open_sanction_id: "Q4665655",
        },
        queryFields: [
          {
            field: "name",
            value: "Abdul Rahman",
          },
          {
            field: "alias",
            value: "Abdul Rahman",
          },
        ],
        searchExplanation: {
          score: 0.880162,
          fieldScores: [
            {
              fieldName: "name",
              weight: 0.10000000149011612,
              score: 0.8531954884529114,
              fieldValue: "abdul rahman yasin",
              errorMessage: "",
            },
            {
              fieldName: "alias",
              weight: 0.10000000149011612,
              score: 0.9071285128593445,
              fieldValue: "abdul asin rahman",
              errorMessage: "",
            },
          ],
        },
      },
    ],
    face_data: {
      open_sanction_id: "Q4665655",
      profile_id: "YASIN Abdul Rahman",
      name: "YASIN Abdul Rahman",
      dob: "10-Apr-60",
      remarks:
        "POB Bloomington Indiana USA citizen United States Passport 27082171 (United States) issued 21 Jun 1992 alt Passport M0887925 (Iraq) SSN 156-92-9858 (United States) USA Passport issued 21 Jun 1992 in Amman Jordan",
      face_image: "467.jpg",
      web_link:
        "https://www.fbi.gov/wanted/wanted_terrorists/abdul-rahman-yasin",
      weblink_pdf: "467.pdf",
    },
    bucket: "face-aml-target-image-collection",
    aws_response: {
      SourceImageFace: {
        BoundingBox: {
          Width: 0.3891890347003937,
          Height: 0.5096740126609802,
          Left: 0.31427812576293945,
          Top: 0.25680267810821533,
        },
        Confidence: 99.99809265136719,
      },
      FaceMatches: [
        {
          Similarity: 0.7468411922454834,
          Face: {
            BoundingBox: {
              Width: 0.6970182657241821,
              Height: 0.7452976107597351,
              Left: 0.15604974329471588,
              Top: 0.21465018391609192,
            },
            Confidence: 99.99993896484375,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.2906191349029541,
                Y: 0.5265099406242371,
              },
              {
                Type: "eyeRight",
                X: 0.5850191712379456,
                Y: 0.48179394006729126,
              },
              {
                Type: "mouthLeft",
                X: 0.37477123737335205,
                Y: 0.7685296535491943,
              },
              {
                Type: "mouthRight",
                X: 0.6202479600906372,
                Y: 0.7318674921989441,
              },
              {
                Type: "nose",
                X: 0.4299072027206421,
                Y: 0.6386524438858032,
              },
            ],
            Pose: {
              Roll: -12.819079399108887,
              Yaw: -8.955286979675293,
              Pitch: 3.7198309898376465,
            },
            Quality: {
              Brightness: 95.45012664794922,
              Sharpness: 60.49041748046875,
            },
          },
        },
      ],
      UnmatchedFaces: [],
    },
    face_matched: false,
  },
  {
    face_match_score: 2.535830497741699,
    hit_id: 3,
    name_matched: "Mohamad Iqbal ABDURRAHMAN",
    name_confidence: "0.876",
    face_found: true,
    rosetteResponse: [
      {
        score: 0.87574565,
        resultFields: {
          name: "Mohamad Iqbal ABDURRAHMAN",
          alias: "Abdul Rahman",
          open_sanction_id: "NK-mS7dt9jAK6uGMuQkSHK7z2",
        },
        queryFields: [
          {
            field: "name",
            value: "Abdul Rahman",
          },
          {
            field: "alias",
            value: "Abdul Rahman",
          },
        ],
        searchExplanation: {
          score: 0.87574565,
          fieldScores: [
            {
              fieldName: "name",
              weight: 0.10000000149011612,
              score: 0.7514913082122803,
              fieldValue: "muhammad iqbal abdur rahman",
              errorMessage: "",
            },
            {
              fieldName: "alias",
              weight: 0.10000000149011612,
              score: 1,
              fieldValue: "abdul rahman",
              errorMessage: "",
            },
          ],
        },
      },
    ],
    face_data: {
      open_sanction_id: "NK-mS7dt9jAK6uGMuQkSHK7z2",
      profile_id: "ABDURRAHMAN Mohamad Iqbal",
      name: "ABDURRAHMAN Mohamad Iqbal",
      dob: "17-Aug-57",
      remarks:
        "alt DOB 17 Aug 1958 POB Korleko-Lombok Timur Indonesia alt POB Tirpas-Selong Village East Lombok Indonesia nationality Indonesia National ID No 3603251708570001 aka ABU JIBRIL",
      face_image: "569_TE4dUhZ.jpg",
      web_link:
        "https://www.voa-islam.com/read/indonesiana/2012/11/21/21850/muhammad-jibril-bebas-badai-pasti-berlalu-jihad-selamanya/",
      weblink_pdf: "569_qyFEpgv.pdf",
    },
    bucket: "face-aml-target-image-collection",
    aws_response: {
      SourceImageFace: {
        BoundingBox: {
          Width: 0.3891890347003937,
          Height: 0.5096740126609802,
          Left: 0.31427812576293945,
          Top: 0.25680267810821533,
        },
        Confidence: 99.99809265136719,
      },
      FaceMatches: [
        {
          Similarity: 2.535830497741699,
          Face: {
            BoundingBox: {
              Width: 0.08279994130134583,
              Height: 0.09461786597967148,
              Left: 0.1237967237830162,
              Top: 0.4811549484729767,
            },
            Confidence: 99.98271942138672,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.14802689850330353,
                Y: 0.5167244672775269,
              },
              {
                Type: "eyeRight",
                X: 0.18256966769695282,
                Y: 0.512580394744873,
              },
              {
                Type: "mouthLeft",
                X: 0.1540307104587555,
                Y: 0.5500548481941223,
              },
              {
                Type: "mouthRight",
                X: 0.18307650089263916,
                Y: 0.5465959906578064,
              },
              {
                Type: "nose",
                X: 0.16862256824970245,
                Y: 0.5365726351737976,
              },
            ],
            Pose: {
              Roll: -5.238321304321289,
              Yaw: 2.0180630683898926,
              Pitch: 0.5140658020973206,
            },
            Quality: {
              Brightness: 65.73749542236328,
              Sharpness: 2.485198736190796,
            },
          },
        },
        {
          Similarity: 0.39589130878448486,
          Face: {
            BoundingBox: {
              Width: 0.08840910345315933,
              Height: 0.1400226652622223,
              Left: 0.9182633757591248,
              Top: 0.4681337773799896,
            },
            Confidence: 99.77145385742188,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.947898805141449,
                Y: 0.5271770358085632,
              },
              {
                Type: "eyeRight",
                X: 0.9896798729896545,
                Y: 0.524163007736206,
              },
              {
                Type: "mouthLeft",
                X: 0.9549351334571838,
                Y: 0.5744502544403076,
              },
              {
                Type: "mouthRight",
                X: 0.9897620677947998,
                Y: 0.5718396902084351,
              },
              {
                Type: "nose",
                X: 0.9766514301300049,
                Y: 0.5521689057350159,
              },
            ],
            Pose: {
              Roll: -2.2614810466766357,
              Yaw: -5.148025035858154,
              Pitch: 3.8354554176330566,
            },
            Quality: {
              Brightness: 75.18961334228516,
              Sharpness: 4.3748369216918945,
            },
          },
        },
        {
          Similarity: 0.27581214904785156,
          Face: {
            BoundingBox: {
              Width: 0.3202623426914215,
              Height: 0.37667667865753174,
              Left: 0.26575711369514465,
              Top: 0.2255273461341858,
            },
            Confidence: 99.99263000488281,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.3330736458301544,
                Y: 0.3456229269504547,
              },
              {
                Type: "eyeRight",
                X: 0.47169029712677,
                Y: 0.3356821537017822,
              },
              {
                Type: "mouthLeft",
                X: 0.35002467036247253,
                Y: 0.4810779392719269,
              },
              {
                Type: "mouthRight",
                X: 0.4658723771572113,
                Y: 0.47317424416542053,
              },
              {
                Type: "nose",
                X: 0.3844313621520996,
                Y: 0.39270761609077454,
              },
            ],
            Pose: {
              Roll: -7.824062824249268,
              Yaw: -7.732597351074219,
              Pitch: 19.27581024169922,
            },
            Quality: {
              Brightness: 78.70358276367188,
              Sharpness: 32.20803451538086,
            },
          },
        },
        {
          Similarity: 0.11212848871946335,
          Face: {
            BoundingBox: {
              Width: 0.0650041326880455,
              Height: 0.07483884692192078,
              Left: 0.6855273246765137,
              Top: 0.26887133717536926,
            },
            Confidence: 99.9393081665039,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.6989151835441589,
                Y: 0.29491713643074036,
              },
              {
                Type: "eyeRight",
                X: 0.7281302213668823,
                Y: 0.29448315501213074,
              },
              {
                Type: "mouthLeft",
                X: 0.7012677788734436,
                Y: 0.32403889298439026,
              },
              {
                Type: "mouthRight",
                X: 0.725899338722229,
                Y: 0.3237132430076599,
              },
              {
                Type: "nose",
                X: 0.711870551109314,
                Y: 0.31477198004722595,
              },
            ],
            Pose: {
              Roll: 0.1328486204147339,
              Yaw: -1.357643723487854,
              Pitch: -13.575138092041016,
            },
            Quality: {
              Brightness: 44.28913116455078,
              Sharpness: 1.399810552597046,
            },
          },
        },
        {
          Similarity: 0.041353289037942886,
          Face: {
            BoundingBox: {
              Width: 0.09578316658735275,
              Height: 0.11356876790523529,
              Left: 0.5914061665534973,
              Top: 0.4714091718196869,
            },
            Confidence: 99.9830093383789,
            Landmarks: [
              {
                Type: "eyeLeft",
                X: 0.6092910170555115,
                Y: 0.5152841806411743,
              },
              {
                Type: "eyeRight",
                X: 0.6497273445129395,
                Y: 0.5097519755363464,
              },
              {
                Type: "mouthLeft",
                X: 0.6183592081069946,
                Y: 0.5553895831108093,
              },
              {
                Type: "mouthRight",
                X: 0.652260422706604,
                Y: 0.5508564710617065,
              },
              {
                Type: "nose",
                X: 0.627578616142273,
                Y: 0.5366604328155518,
              },
            ],
            Pose: {
              Roll: -7.744900703430176,
              Yaw: -9.383913040161133,
              Pitch: -1.6457573175430298,
            },
            Quality: {
              Brightness: 64.5584945678711,
              Sharpness: 2.485198736190796,
            },
          },
        },
      ],
      UnmatchedFaces: [],
    },
    face_matched: false,
  },
  {
    hit_id: 4,
    name_matched: "Muhammad Jibril ABDUL RAHMAN",
    name_confidence: "0.817",
    face_found: false,
    rosetteResponse: [
      {
        score: 0.81744176,
        resultFields: {
          name: "Muhammad Jibril ABDUL RAHMAN",
          alias: "abdul jibriel muhammad rahman",
          open_sanction_id: "NK-YfzC9BkaoJwBqgNyFeNQpe",
        },
        queryFields: [
          {
            field: "name",
            value: "Abdul Rahman",
          },
          {
            field: "alias",
            value: "Abdul Rahman",
          },
        ],
        searchExplanation: {
          score: 0.81744176,
          fieldScores: [
            {
              fieldName: "name",
              weight: 0.10000000149011612,
              score: 0.8032063841819763,
              fieldValue: "muhammad jibril abdul rahman",
              errorMessage: "",
            },
            {
              fieldName: "alias",
              weight: 0.10000000149011612,
              score: 0.8316771984100342,
              fieldValue: "abdul jibriel muhammad rahman",
              errorMessage: "",
            },
          ],
        },
      },
    ],
  },
  {
    hit_id: 5,
    name_matched: "MAKKI, Hafiz Abdul Rahman",
    name_confidence: "0.815",
    face_found: false,
    rosetteResponse: [
      {
        score: 0.81477225,
        resultFields: {
          name: "MAKKI, Hafiz Abdul Rahman",
          alias: "abdul hafiz rehman",
          open_sanction_id: "NK-f7Ery4nScy69kwkUJUqYDr",
        },
        queryFields: [
          {
            field: "name",
            value: "Abdul Rahman",
          },
          {
            field: "alias",
            value: "Abdul Rahman",
          },
        ],
        searchExplanation: {
          score: 0.81477225,
          fieldScores: [
            {
              fieldName: "name",
              weight: 0.10000000149011612,
              score: 0.7897217869758606,
              fieldValue: "makki hafiz abdul rahman",
              errorMessage: "",
            },
            {
              fieldName: "alias",
              weight: 0.10000000149011612,
              score: 0.8398227691650391,
              fieldValue: "abdul hafiz rehman",
              errorMessage: "",
            },
          ],
        },
      },
    ],
  },
];
