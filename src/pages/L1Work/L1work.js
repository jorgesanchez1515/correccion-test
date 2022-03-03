import React, { useState, useEffect } from 'react'
import { Button, Container } from "semantic-ui-react";
import { Radio } from 'react-bootstrap';
import { map } from "lodash";
// import axios from 'axios';
import { isWaitingAnswers } from '../../utils/Api';
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import Qs from "qs";

import logo from '../../logo.svg';
import './L1work.scss';

const db = firebase.firestore(firebase);

const answer = "https://docs.google.com/spreadsheets/d/1T0p2nG9p-Rdg6N-UkhAFfBI9WCYraOBgRqcRThCk9sY/edit?resourcekey#gid=1586831369";

const skill = "Vocabulary";

function L1work(props) {

    const { user, myclass, idclass, classname, teachername } = props;
    // console.log(user.uid);
    const [formData, setformData] = useState("");
    //const [myclass, setMyclass] = useState(null);
    const [userDetails, setUserDetails] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const [teacherid, setTeacherid] = useState('');
    //console.log(myclass);
    //console.log(userDetails);
    //console.log(idclass);
    ////////input informations  
    //console.log(user);
    //console.log(classname);
    // console.log(teachername);


    ////////////////course details user
    useEffect(() => {
        db.collection('waiting')
            .doc(user.uid).get()
            .then(snapshot => setUserDetails(snapshot.data()))
        //   setMyclass(arrayofClasses);

    }, [])
    ////////////////

    ////////////set is waiting answers  
    useEffect(() => {
        isWaitingAnswers(user.uid).then(response => {
            setWaiting(response);
            // console.log(response);
        });
    }, [user])
    /////////  
    const onChange = e => {

        // console.log("Key:" +e.target.name);
        // console.log("Value:" +e.target.value);
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    /////////////send response record
    const respuesta = () => {

        db.collection("answers")
            .add({

                user: user.uid,
                useremail: user.email,
                username: user.displayName,
                userwork: "one",
                usercourse: userDetails.course,
                userlevel: userDetails.level,
                userclassid: idclass,
                userclassname: classname,
                avatarUser: user.photoURL,
                createAt: new Date(),
                Teacher: teachername,
                answerlink: answer,
                studentskill: skill,

            })
            .then(() => {
                toast.success("The responses are already sent.");
                // resetForm();
                setIsLoading(false);
                // setShowModal(false);
            })
            .catch(() => {
                toast.warning("Error recording the responses.");
                setIsLoading(false);
            });
    }
    ///////reset fields
    const resetFields = () => {
        document.getElementById("l1-course-form").reset();
    }


    //////////////////submit function  
    const onSubmit = (e) => {
        //console.log(formData);

        var str = Qs.stringify(formData)


        e.preventDefault();
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSfOD-29G8W_lcw7ox4smjso5J3Lj6mYv_vja1bTEfTH3vllUg/formResponse', {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            mode: 'no-cors',
            body: str,
            redirect: 'follow'
        }).then(() => {
            respuesta();
            resetFields();
        })


    };
    return (
        <>
            {waiting ? (

                <div className="App">
                    <header className="App-header">

                    <form  onChange={onChange} className="trabajo-l1" id="l1-course-form">
	<fieldset>
		<div>
			<h2 className="L1">B14U6L1N</h2>
		</div>
	</fieldset>
	<fieldset>
		<div className="parrafo-uno">
			<p>Responde a las siguientes preguntas.</p>
		</div>
	</fieldset>
	<fieldset>
		<legend for="" className="leyenda">Email</legend>
		<div class="form-group">
			<input id="emailAddress" type="email" name="emailAddress" class="form-control" required/>
		</div>
	</fieldset>
	<fieldset>
		<legend for="716231463" className="leyenda">1. Este año voy a _________ las vacaciones en la Costa Brava. </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1393700542" value="veranear" required/>
					veranear
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1393700542" value="vacacionar" required/>
					vacacionar
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1393700542" value="pasar" required/>
					pasar
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="214565366" className="leyenda">2. Con mis compañeros de trabajo nos alojaremos en __________ frente al mar.</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.517185688" value="resorte" required/>
					resorte
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.517185688" value="resort" required/>
					resort
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.517185688" value="restaurante" required/>
					restaurante
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="2015282755" className="leyenda">3. Tengo una agencia de turismo que vende excursiones __________ a lugares con historia. </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1654019391" value="guía" required/>
					guía
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1654019391" value="guiadas" required/>
					guiadas
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1654019391" value="guiado" required/>
					guiado
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1559532276" className="leyenda">4. El __________ es una opción muy interesante para los amantes de la bicicleta</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.701474427" value="cicloturismo" required/>
					cicloturismo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.701474427" value="biciturismo" required/>
					biciturismo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.701474427" value="exoturismo" required/>
					exoturismo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1290104294" className="leyenda">5. Nos hemos dedicado al turismo __________. Vendemos viajes a ___________ que quieren visitar iglesias y templos en distintos lugares.  </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1208772601" value="peregrino / turistas" required/>
					peregrino / turistas
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1208772601" value="aventura / clientes" required/>
					aventura / clientes
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1208772601" value="religioso / peregrinos" required/>
					religioso / peregrinos
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="189076065" className="leyenda">6. El turismo __________ es una propuesta turística para conocer las comidas típicas de una región.    </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1418730125" value="aventura" required/>
					aventura
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1418730125" value="gastronómico" required/>
					gastronómico
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.1418730125" value="de negocios" required/>
					de negocios
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1728824291" className="leyenda">7. En los últimos años hemos desarrollado muchas ___________ de servicios turísticos que brindan información útil para los viajeros.    </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2080926227" value="aplicativos" required/>
					aplicativos
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2080926227" value="aplicados" required/>
					aplicados
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2080926227" value="aplicaciones" required/>
					aplicaciones
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="701822805" className="leyenda">8. A los turistas que no les gusta compartir la habitación no le aconsejamos que se alojen en un .......</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.233362501" value="hostal" required/>
					hostal
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.233362501" value="hotel" required/>
					hotel
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.233362501" value="alquiler vacacional" required/>
					alquiler vacacional
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="754874466" className="leyenda">9. A los clientes con alto poder adquisitivo les ofrecemos alojamiento en ________</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.445551925" value="autocaravanas" required/>
					autocaravanas
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.445551925" value="hostales" required/>
					hostales
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.445551925" value="hoteles de lujo" required/>
					hoteles de lujo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1085452241" className="leyenda">10. El turismo de __________ se refiere a los traslados de un lugar a otro relacionados con actividades corporativas o laborales.  </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2091231300" value="aventura" required/>
					aventura
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2091231300" value="negocios" required/>
					negocios
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta">
					<input type="radio" name="entry.2091231300" value="religioso" required/>
					religioso
				</label>
			</div>
		</div>
	</fieldset>
	<input type="hidden" name="fvv" value="1"/>
	<input type="hidden" name="fbzx" value="8461977738504272510"/>
	<input type="hidden" name="pageHistory" value="0"/>
	<div class="center">
		<Button className="btn-primary-uno" onClick={onSubmit} isLoading={isLoading}>Send</Button>
	</div>
</form>


                    </header>
                </div>

            ) : (
                <div style={{ backgroundColor: '#101010', height: '260vh' }}>
                    <Container>
                        <p className="not-assigned">
                            You already sent your answers!
                            <br></br>
                            or
                            <br></br>
                            You don't have a class assigned yet.
                        </p>
                    </Container>
                </div>
            )}
        </>
    )
}
export default L1work;