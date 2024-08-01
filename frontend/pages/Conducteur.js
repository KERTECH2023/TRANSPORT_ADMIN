/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from "axios";
import { useRouter } from "next/router";
import { Stepper, Step, StepLabel, Button, Typography, Container } from '@material-ui/core';

const Conducteur = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Information Personnelles', 'Attachements','details Taxi'];

  const handleNext = () => {
    // if (activeStep === 0) {
    //   if (!Nom || !Prenom || !email || !cnicNo || !phone || !gender || !DateNaissance || !address || !postalCode) {
    //     // If any required field is empty, set error state and return early
    //     setNomError(!Nom ? "Please enter your Nom" : "");
    //     setPrenError(!Prenom ? "Please enter your Prénom" : "");
    //     setEmailError(!email ? "Please enter your Email" : "");
    //     setCinError(!cnicNo ? "Please enter your CIN" : "");
    //     setPhoneError(!phone ? "Please enter your N° Téléphone" : "");
    //     // Add validation checks for other fields here
    //     return;
    //   }
    // }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [chauffId,setChauffId]=useState()
  const [immatriculation, setImmatriculation] = useState()
  const [modelle, setModelle] = useState()
  const [photoAssurance, setPhotoAssurance] = useState({file :[]})
  const [photoCartegrise, setPhotoCartegrise] = useState({file :[]})

  const [submitStatus, setSubmitStatus] = useState("");
  const [Nom, setNom] = useState()
  const [Prenom, setPrenom] = useState()
  const [email, setemail] = useState()
  const [phone, setphone] = useState()
  const [photoAvatar, setphotoAvatar] = useState({file :[]})
  const [photoPermisRec, setphotoPermisRec] = useState({file :[]})
  const [photoPermisVer, setphotoPermisVer] = useState({file :[]})
  const [photoVtc, setphotoVtc] = useState({file :[]})
  const [photoCin, setphotoCin] = useState({file :[]})
  const [gender, setgender] = useState()
  const [DateNaissance, setDateNaissance] = useState()
  const [Nationalite, setNationalite] = useState()
  const [cnicNo, setcnicNo] = useState()
  const [address, setaddress] = useState()
  const [postalCode, setpostalCode] = useState()

  const [emailError, setEmailError] = useState("");
const [phoneError, setPhoneError] = useState("");
const [cinError, setCinError] = useState("");
const [nomError, setNomError] = useState("");
const [prenError, setPrenError] = useState("");

const [phoneCode, setPhoneCode] = useState("");

    


  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
const router =useRouter();
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countriesData = data.map(country => ({
          value: country.name.common,
          label: country.idd.root + country.idd.suffixes,
          icon: country.flags.png,
        }));
        setCountries(countriesData);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);



  const calculateMaxDate = () => {
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
    const year = minBirthDate.getFullYear();
    let month = minBirthDate.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
  
    let day = minBirthDate.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit function is called");
    const fullPhoneNumber = `${phoneCode}${phone}`;

    
    
   try {
    // Handle validations
    const response = await axios.post(
      " http://localhost:3005/Chauff/AjoutChauf",
      {
        Nom,
        Prenom,
        email,
        phone,
        photoAvatar,
          photoCin,
          photoPermisRec,
          photoPermisVer,
          photoVtc,
        gender,
        DateNaissance,
        Nationalite,
        cnicNo,
        address,
        postalCode,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
      
    const newUser = response.data.uses;
    console.log("res1000", newUser);
    console.log("fileeee*//**e", photoAvatar);
    
      

      
      setNom("");
      setPrenom("");
      setemail("");
      setphone("");
      document.getElementById("login").reset();
      setgender("");
      setDateNaissance("");
      setNationalite("");
      setcnicNo("");
      setaddress("");
      setpostalCode("");
      setEmailError("");
  
      console.log("file", response.data);
      const userData = response.data;
      console.log(userData)
      setChauffId(userData);
      
     
      //router.push("/");
      handleNext()

    } catch (err) {
      console.warn(err);
      if (err.response) {
        if (err.response.status === 403) {
          setEmailError("l'email existe déjà");
        } else {
          setEmailError("");
        }
        if (err.response.data.phoneExists) {
          setPhoneError("Phone already exists");
        } else {
          setPhoneError("");
        }
        if (err.response.data.cinExists) {
          setCinError("CIN already exists");
        } else {
          setCinError("");
        }
      }
    }
  };
  useEffect(() => {
    console.log("Updated chauffId:", chauffId);
  }, [chauffId]);
  const handleCarDetailsSubmit = async (e) => {
    e.preventDefault();
    console.log("handleCarDetailsSubmit function is called");
    

    
  
  try {
    // Handle validations
    const response = await axios.post(
      `http://localhost:3005/Voi/addvoiture/${chauffId}`,
      {
        photoCartegrise,
        photoAssurance,
        immatriculation,
        modelle
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
     
      setSubmitStatus(
        "Merci Pour Votre inscription votre dossier sera traité dans les prochains jours"
      );
      setImmatriculation("");
      setModelle("");
      
      
      handleNext()
      //router.push("/");

    } catch (err) {
      console.warn(err);
     
    }
  }; 
 
  

return (
  <Container>
    <div>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center space-y-4 py-24">
          <p className="text-3xl text-center font-light text-gray-600">
            Vous souhaitez nous Rejoindre ?<br />
            Veuillez Remplir Le Formulaire ci-dessous avec vos informations
          </p>
          {submitStatus && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-green-500 bg-white border border-green-500 rounded-lg py-2 px-4">
                {submitStatus}
              </p>
            </div>
          )}
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="container mx-auto px-16  lg:grid-cols-2">
            {activeStep === 0 && (
              <div>
                <Typography variant="h5" gutterBottom>
                   Informations Personnelles
                </Typography>
                <div className='form-row'>
                <div className='col'>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="NOM"
                    onChange={(e) => setNom(e.target.value)}
                    value={Nom || ""}                
                    required
                  />
                   {nomError && <label className="text-red-500">{nomError}</label>}

                </div>  
                </div>
                <div className='col'>

               <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="Prénom"
                    onChange={(e) => setPrenom(e.target.value)}
                    value={Prenom || ""}              
                    required
                  />
             {prenError && <label className="text-red-500">{prenError}</label>}

                </div>  </div>  </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="name@gmail.com"
                    onChange={(e) => setemail(e.target.value)}
                    value={email || ""}
                    required
                  />
        {emailError && <label className="text-red-500">{emailError}</label>}

                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Num Permis</label>
                  <input
                    type="number"
                    id="cin"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="012345678"
                    onChange={(e) => setcnicNo(e.target.value)}
                    value={cnicNo || ""}
                    required
                  />
            {cinError && <label className="text-red-500">{cinError}</label>}

                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">  N° Téléphone :</label>
                  <div className="flex items-center">

   <select
      id="phoneCode"
      className="block w-16 p-2.5 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
      onChange={e => setPhoneCode(e.target.value)}
      value={phoneCode || ""}
      required
   >
      <option value="">Choisir le code</option>    
      <option value="+212">+212</option>
      <option value="+213">+213</option>      
      <option value="+216">+216</option>      {/* Ajoutez d'autres options pour d'autres codes de téléphone */}
    </select>
                  <input
                    type="text"
                    id="phone"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="012345678"
                    onChange={(e) => setphone(e.target.value)}
                    value={phone || ""}
                    required
                  /></div>
  {phoneError && <label className="text-red-500">{phoneError}</label>}

                </div>
               
                {/* Add other personal information fields */}
                {/* Prenom */}
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Genre</label>
                  <select
           id="genre"
             className="text-gray-900 block w-full p-2.5"
             onChange={e => setgender(e.target.value)} value={gender || ""}
            required
         >
           <option value="">Sélectionner</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
                </div>
                {/* Email */}
                <div className="col-span-1 row-span-1 p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Date De Naissance</label>
                  <input
                    type="Date"
                    id="Date Naissance"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={(e) => setDateNaissance(e.target.value)}
                    value={DateNaissance || ""}
                    max={calculateMaxDate()}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1 p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Adresse</label>
                  <input
                    type="text"
                    id="adresse"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder=""
                    onChange={(e) => setaddress(e.target.value)}
                    value={address || ""}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1 p-4 px-8 border">
                  <label className="block mb-2 text-gray-900"> Code Postal</label>
                  <input
                    type="text"
                    id="code postal"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder=""
                    onChange={(e) => setpostalCode(e.target.value)}
                    value={postalCode || ""}
                    required
                  />
                </div>
                {/* Other personal information fields */}
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <Typography variant="h5" gutterBottom>
                  Attachements
                </Typography>
                {/* Add attachment fields */}
                {/* Photo visage */}
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Photo visage</label>
                  <input
                    type="file"
                    id="avatar"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setphotoAvatar(e.target.files[0])} 
                                       required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Photo CIN</label>
                  <input
                    type="file"
                    id="photo_cin"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setphotoCin(e.target.files[0])}
                    required
                  />
                </div>
                
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900"> Photo VTC</label>
                  <input
                    type="file"
                    id="photo_VTC"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setphotoVtc(e.target.files[0])}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900"> Photo Permis Recto</label>
                  <input
                    type="file"
                    id="permis_recto"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setphotoPermisVer(e.target.files[0])}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Photo Permis Verso</label>
                  <input
                    type="file"
                    id="permis_verso"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setphotoPermisRec(e.target.files[0])}
                    required
                  />
                </div>

                {/* Other attachment fields */}
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <Typography variant="h5" gutterBottom>
                  Details Taxi
                </Typography>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Immatriculation</label>
                  <input
                    type="text"
                    id="immatriculation"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="Immatriculation"
                    value={immatriculation}
                    onChange={(e) => setImmatriculation(e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Modelle</label>
                  <input
                    type="text"
                    id="modelle"
                    className="text-gray-900 block w-full p-2.5"
                    placeholder="Modelle"
                    value={modelle}
                    onChange={(e) => setModelle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900"> Photo Cartegrise</label>
                  <input
                    type="file"
                    id="categrise"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setPhotoCartegrise(e.target.files[0])}

                    required
                  />
                </div>
                <div className="col-span-1 row-span-1  p-4 px-8 border">
                  <label className="block mb-2 text-gray-900">Photo Assurance</label>
                  <input
                    type="file"
                    id="assurance"
                    className="text-gray-900 block w-full p-2.5"
                    onChange={e => setPhotoAssurance(e.target.files[0])}
                    required
                  />
                </div>
              </div>
            )}
          </div>
          <div class="mt-2">
            {activeStep === steps.length ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  Merci pour nous rejoindre
                </Typography>
              </div>
            ) : (
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                {activeStep === steps.length-2 ? (
    <Button
      id="sub_btn"
      type="submit"
      value="login"
      variant="contained"

      color="primary"
    >
    Next
    </Button>
  ) : activeStep === steps.length - 1 ? (
    <Button
      id="sub_btn"
      type="submit"
      value="login"
      onClick={(e) => {
        handleCarDetailsSubmit(e);
        
      }}     
       className="text-white bg-amber-600 hover:bg-amber-800 rounded-3xl px-8 py-3 text-center mr-2 mb-2"

    >
        Rejoinez Nous
    </Button>
  ): (
    <Button
    variant="contained"

      color="primary"
      onClick={handleNext}
    >
      Next
    </Button>
  )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  </Container>
);
};
export default Conducteur;
