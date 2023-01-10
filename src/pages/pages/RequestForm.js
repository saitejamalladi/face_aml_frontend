import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Box,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import PaperComponent from "./papercontent/PaperContent";
import { DatePicker } from "@material-ui/pickers";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);
const CardContent = styled(MuiCardContent)`
  padding: 2px;
  padding-bottom: 2px;
  margin: 0;
`;

let nationalities = [
  "Global",
  "European Union",
  "Zaire",
  "Czech Republic",
  "Kosovo",
  "East Germany",
  "Yugoslavia",
  "Serbia and Montenegro",
  "Czechoslovakia",
  "Soviet Union",
  "Abkhazia (Occupied Georgia)",
  "South Ossetia (Occupied Georgia)",
  "Luhansk (Occupied Ukraine)",
  "Donetsk (Occupied Ukraine)",
  "Crimea (Occupied Ukraine)",
  "Somaliland",
  "Northern Cyprus",
  "Nagorno-Karabakh",
  "Tibet",
  "Sark",
  "Wales",
  "Scotland",
  "Northern Ireland",
  "Transnistria (PMR)",
  "Ascension Island",
  "Andorra",
  "United Arab Emirates",
  "Afghanistan",
  "Antigua & Barbuda",
  "Anguilla",
  "Albania",
  "Armenia",
  "Angola",
  "Antarctica",
  "Argentina",
  "American Samoa",
  "Austria",
  "Australia",
  "Aruba",
  "Åland Islands",
  "Azerbaijan",
  "Bosnia & Herzegovina",
  "Barbados",
  "Bangladesh",
  "Belgium",
  "Burkina Faso",
  "Bulgaria",
  "Bahrain",
  "Burundi",
  "Benin",
  "St. Barthélemy",
  "Bermuda",
  "Brunei",
  "Bolivia",
  "Caribbean Netherlands",
  "Brazil",
  "Bahamas",
  "Bhutan",
  "Bouvet Island",
  "Botswana",
  "Belarus",
  "Belize",
  "Canada",
  "Cocos (Keeling) Islands",
  "Congo - Kinshasa",
  "Central African Republic",
  "Congo - Brazzaville",
  "Switzerland",
  "Côte d’Ivoire",
  "Cook Islands",
  "Chile",
  "Cameroon",
  "China",
  "Colombia",
  "Clipperton Island",
  "Costa Rica",
  "Cuba",
  "Cape Verde",
  "Curaçao",
  "Christmas Island",
  "Cyprus",
  "Germany",
  "Diego Garcia",
  "Djibouti",
  "Denmark",
  "Dominica",
  "Dominican Republic",
  "Algeria",
  "Ceuta & Melilla",
  "Ecuador",
  "Estonia",
  "Egypt",
  "Western Sahara",
  "Eritrea",
  "Spain",
  "Ethiopia",
  "Eurozone",
  "Finland",
  "Fiji",
  "Falkland Islands",
  "Micronesia",
  "Faroe Islands",
  "France",
  "Gabon",
  "United Kingdom",
  "Grenada",
  "Georgia",
  "French Guiana",
  "Guernsey",
  "Ghana",
  "Gibraltar",
  "Greenland",
  "Gambia",
  "Guinea",
  "Guadeloupe",
  "Equatorial Guinea",
  "Greece",
  "South Georgia & South Sandwich Islands",
  "Guatemala",
  "Guam",
  "Guinea-Bissau",
  "Guyana",
  "Hong Kong SAR China",
  "Heard & McDonald Islands",
  "Honduras",
  "Croatia",
  "Haiti",
  "Hungary",
  "Canary Islands",
  "Indonesia",
  "Ireland",
  "Israel",
  "Isle of Man",
  "India",
  "British Indian Ocean Territory",
  "Iraq",
  "Iran",
  "Iceland",
  "Italy",
  "Jersey",
  "Jamaica",
  "Jordan",
  "Japan",
  "Kenya",
  "Kyrgyzstan",
  "Cambodia",
  "Kiribati",
  "Comoros",
  "St. Kitts & Nevis",
  "North Korea",
  "South Korea",
  "Kuwait",
  "Cayman Islands",
  "Kazakhstan",
  "Laos",
  "Lebanon",
  "St. Lucia",
  "Liechtenstein",
  "Sri Lanka",
  "Liberia",
  "Lesotho",
  "Lithuania",
  "Luxembourg",
  "Latvia",
  "Libya",
  "Morocco",
  "Monaco",
  "Moldova",
  "Montenegro",
  "St. Martin",
  "Madagascar",
  "Marshall Islands",
  "North Macedonia",
  "Mali",
  "Myanmar (Burma)",
  "Mongolia",
  "Macao SAR China",
  "Northern Mariana Islands",
  "Martinique",
  "Mauritania",
  "Montserrat",
  "Malta",
  "Mauritius",
  "Maldives",
  "Malawi",
  "Mexico",
  "Malaysia",
  "Mozambique",
  "Namibia",
  "New Caledonia",
  "Niger",
  "Norfolk Island",
  "Nigeria",
  "Nicaragua",
  "Netherlands",
  "Norway",
  "Nepal",
  "Nauru",
  "Niue",
  "New Zealand",
  "Oman",
  "Panama",
  "Peru",
  "French Polynesia",
  "Papua New Guinea",
  "Philippines",
  "Pakistan",
  "Poland",
  "St. Pierre & Miquelon",
  "Pitcairn Islands",
  "Puerto Rico",
  "Palestinian Territories",
  "Portugal",
  "Palau",
  "Paraguay",
  "Qatar",
  "Outlying Oceania",
  "Réunion",
  "Romania",
  "Serbia",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Solomon Islands",
  "Seychelles",
  "Sudan",
  "Sweden",
  "Singapore",
  "St. Helena",
  "Slovenia",
  "Svalbard & Jan Mayen",
  "Slovakia",
  "Sierra Leone",
  "San Marino",
  "Senegal",
  "Somalia",
  "Suriname",
  "South Sudan",
  "São Tomé & Príncipe",
  "El Salvador",
  "Sint Maarten",
  "Syria",
  "Eswatini",
  "Tristan da Cunha",
  "Turks & Caicos Islands",
  "Chad",
  "French Southern Territories",
  "Togo",
  "Thailand",
  "Tajikistan",
  "Tokelau",
  "Timor-Leste",
  "Turkmenistan",
  "Tunisia",
  "Tonga",
  "Turkey",
  "Trinidad & Tobago",
  "Tuvalu",
  "Taiwan",
  "Tanzania",
  "Ukraine",
  "Uganda",
  "U.S. Outlying Islands",
  "United Nations",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "St. Vincent & Grenadines",
  "Venezuela",
  "British Virgin Islands",
  "U.S. Virgin Islands",
  "Vietnam",
  "Vanuatu",
  "Wallis & Futuna",
  "Samoa",
  "Pseudo-Accents",
  "Pseudo-Bidi",
  "Yemen",
  "Mayotte",
  "South Africa",
  "Zambia",
  "Zimbabwe",
];

const RequestForm = ({ handleGetResponse }) => {
  const [request, setRequest] = useState({
    name: "",
    type: "Person",
    dob: new Date(),
    nationality: "",
    image: null,
  });
  const submitRequest = () => {
    handleGetResponse(request);
  };
  const selectFile = (event) => {
    setRequest({ ...request, image: event.target.files[0] });
    console.log(event.target.files[0]);
  };
  const getObjectURL = (selectedFile) => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
  };
  const onNameChange = (event) => {
    setRequest({ ...request, name: event.target.value });
  };
  const onTypeChange = (event) => {
    setRequest({ ...request, type: event.target.value });
  };
  const onDOBChange = (newDOB) => {
    setRequest({ ...request, dob: newDOB });
  };
  const onNationalityChange = (event) => {
    setRequest({ ...request, nationality: event.target.value });
  };

  return (
    <PaperComponent
      heading={"Request"}
      description={`Enter the name and upload the image to get the results`}
    >
      <Card mb={6} style={{ minHeight: "80%" }}>
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            placeholder={"Enter the name"}
            onChange={onNameChange}
            fullWidth
          />
          <Spacer mb={3} />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-">Customer Type</InputLabel>
              <Select
                labelId="demo-type"
                id="demo-type"
                value={request.type}
                label="Customer Type"
                input={<OutlinedInput label="Customer Type" />}
                onChange={onTypeChange}
              >
                <MenuItem value={"Person"}>Person</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Spacer mb={3} />
          <DatePicker
            id="date"
            name="Date of Birth"
            label="Date of Birth"
            value={request.dob}
            onChange={onDOBChange}
            clearable
            autoOk
            format="dd-MM-yyyy"
            disableOpenOnEnter
            animateYearScrolling={false}
            renderInput={(params) => (
              <TextField variant={"outlined"} {...params} />
            )}
            fullWidth
          />
          <Spacer mb={3} />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                labelId="demo-Nationality"
                id="demo-Nationality"
                value={request.nationality}
                label="Nationality"
                input={<OutlinedInput label="Nationality" />}
                onChange={onNationalityChange}
              >
                {nationalities.map((nationality) => (
                  <MenuItem key={nationality} value={nationality}>
                    {nationality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Spacer mb={3} />
          <Button variant="contained" component="label" onChange={selectFile}>
            {request.image
              ? request.image.name
              : "Click to upload the customer image"}
            <input type="file" hidden />
          </Button>
          <Spacer mb={3} />
          {<img src={getObjectURL(request.image)} alt={"test"} width={"75%"} />}
          <Spacer mb={3} />
          <Grid container direction={"row-reverse"}>
            <Grid item>
              <Button
                color={"primary"}
                variant="contained"
                onClick={submitRequest}
                disabled={!request.name || !request.image}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PaperComponent>
  );
};
export default RequestForm;
