/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import { useRouter } from "next/router";




const Auth = () => {

	const [submitStatus, setSubmitStatus] = useState("");
	const [email, setemail] = useState()
	const [emailError, setEmailError] = useState("");
	const [compteError, setCompteError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const router = useRouter();
	
	

	const [password, setPassword] = useState()
	

	const handleSubmit = e => {
		// Prevent the default submit and page reload
		e.preventDefault()
	
	
	  
	 
	
	
	
		// Handle validations
		axios
		  .post(" http://localhost:3005/Chauff/reset", {email})
		
		 
		  .then(response => {
			const newUser = response.data.uses
			
			setSubmitStatus("Un Email a été Envoye ");
			
			setemail("");
			setEmailError("");
		
			
			//navigate("/users")
			setTimeout(() => {
			  setSubmitStatus("");
			  
			}, 10000);
	  
		 
		  
						// Handle response
		  })
		 
	  .catch(err =>{
		console.warn(err)
		if (err.response ) {
		  if (err.response.status === 404) {
			setEmailError("l'email n'existe pas");
		  } else {
			setEmailError("");
		  }
		  
		}
	 
	  })
	  
		}

		const handleSubmite = e => {
			// Prevent the default submit and page reload
			e.preventDefault()
		
			// Handle validations
			axios
			  .post(" http://localhost:3005/Chauff/loginch", { email, password })
			  .then(response => {
				const user = response.data
				if (user.Cstatus === 'Désactivé') {
					// Display a message to the user indicating that their account is disabled
					console.log("Account is disabled.");
					setCompteError("Votre Compte est Désactivé");
					router.push("/Auth");
					return;
				} 
				
				console.log("role",user.role)
				window.localStorage.setItem('user',JSON.stringify(response))
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("userRole", user.role);
				localStorage.setItem("userNom", user.Nom);
				localStorage.setItem("userPrenom", user.Prenom);
				localStorage.setItem("userAvatar", user.photoAvatar);
				localStorage.setItem("userAdress", user.address);
				localStorage.setItem("userEmail", user.email);
				localStorage.setItem("userId", user.id);
				localStorage.setItem("Cstatus", user.Cstatus);
				localStorage.setItem("isLoggedIn", true);
				
				
				console.log(response)

				setEmailError("");
				setPasswordError("");
				setCompteError("");
			
				router.push("/profile");
							// Handle response
			  })
			 
			  .catch(err =>{
				console.warn(err)
				if (err.response ) {
				  if (err.response.status === 403) {
					setEmailError("l'email n'existe pas");
				  } else {
					setEmailError("");
				  }
				  if (err.response.status === 406) {
					setPasswordError("Mot De Passe Incorrect");
				  } else {
					setPasswordError("");
				  }
				  
				}
			 
			  })
	  
			}


  return (
    <div>
        
		
	
	

	<div className="hi">
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3"><span>Log In </span><span>MOT DE PASSE OUBLIÉ?</span></h6>
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label htmlFor="reg-log"></label>
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">

								<form className="card-front" action="" id="loginn" method="post" onSubmit={handleSubmite}>
								<div >
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3">Log In</h4>
											<strong>{compteError && <label className="text-red-500" >{compteError}</label>}</strong>
											<div className="form-group">
												<input type="email" name="logemail" className="form-style" placeholder="Email" id="logemail" autoComplete="off"
													 onChange={e => setemail(e.target.value)}
													 value={email || ""}
													 required />
												
												<EmailIcon className="input-icon uil uil-at" />

												<strong>{emailError && <label className="text-red-500" >{emailError}</label>}</strong>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Mot de passe" id="logpass" autoComplete="off"
													 onChange={e => setPassword(e.target.value)}
													 value={password || ""}
													 required />
												<LockIcon className="input-icon uil uil-lock-alt" />

												<strong>{passwordError && <label className="text-red-500" >{passwordError}</label>}</strong>
												
											</div>

                                            <button
        									id="sub_btn" 
            								type="submit" 
            								value="login"
											className="btn mt-4"
          									>
           												 LogIn
          									</button>
                            				
				      					</div>
			      					</div>
			      				</div>
								  </form>


								<form className="card-back"  action="" id="login" method="post" onSubmit={handleSubmit}>

								{submitStatus && (
        						<div className="flex justify-center items-center mt-4">
          						<p className="text-green-500 bg-white border border-green-500 rounded-lg py-2 px-4">
            					{submitStatus}
          						</p>
        						</div>
      							)}

								<div >
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3">MOT DE PASSE OUBLIÉ?</h4>
												
											<div className="form-group mt-2">
												<input type="email" name="logmail" className="form-style" placeholder="Email" id="logmail" autoComplete="off"
												 onChange={e => setemail(e.target.value)}
												 value={email || ""}
												 required
												  />
												<EmailIcon className="input-icon uil uil-at" />
												<strong>{emailError && <label className="text-red-500" >{emailError}</label>}</strong>
											</div>	
											
                                         

											<button
            id="sub_btnn" 
            type="submit" 
            value="login"
			className="btn mt-4"
          >
            Envoyé
          </button>
				      					</div>
			      					</div>
			      				</div>
								  </form>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
    </div>
  )
}

export default Auth