import React, { useState, useEffect } from 'react'
import { Button, Container } from "semantic-ui-react";
import { Radio } from 'react-bootstrap';
import { isWaitingAnswers } from '../../utils/Api';
import { toast } from "react-toastify";
import { map } from "lodash";
import firebase from "../../utils/Firebase";

// import axios from 'axios';
import Qs from "qs";
import logo from '../../logo.svg';

import './L2work.scss';

const db = firebase.firestore(firebase);

const answerdos = "https://docs.google.com/spreadsheets/d/10_JMBTym-qzNKWrE-kDkHpmOLpBIfbUzB5jDzyLdYSw/edit?resourcekey#gid=769664324";

const skilldos = "Grammar";

function L2work(props) {

    const { user, idclass, classname, teachername } = props;
    //console.log(user.uid);
    // console.log(idclass);
    const [formData, setformData] = useState("");
    const [waitingdos, setWaitingdos] = useState(false);
    const [userDetailsdos, setUserDetailsdos] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [teacheridos, setTeacheridos] = useState(null);
    //console.log(userDetailsdos);
    //console.log(teachername);



    ////////////////course details user
    /*useEffect(() => {
        db.collection('waiting')
            .doc(user.uid).get()
            .then(snapshot => setUserDetailsdos(snapshot.data()))
        //   setMyclass(arrayofClasses);

    }, [])
    ////////////////

    ////////////set is waiting answers  
    useEffect(() => {
        isWaitingAnswers(user.uid).then(response => {
            setWaitingdos(response);
            // console.log(response);
        });
    }, [user])*/
    /////////  

    // Course details user
	useEffect(() => {
		if(!idclass) 
			return
		
		db.collection("studentclass")
		.doc(idclass)
		.get()
		.then(response => {
			const data = response?.data()

			setUserDetailsdos({
				course: data?.course || "Null",
				level:  data?.level  || "Null"
			})
		})
	}, [idclass])

    // Set is waiting answers  
    useEffect(() => {
		db.collection("answers")
		.where("user", "==", user.uid)
		.get()
		.then(response => {

			let myAnswers = response?.docs.map(doc => doc.data())

			let result = true

			myAnswers.forEach(elem => {
				if(elem.answerlink == answerdos)
					result = false
			})

			setWaitingdos(result)
		})
    }, [user]) 


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
                userwork: "two",
                usercourse: userDetailsdos.course,
                userlevel: userDetailsdos.level,
                userclassid: idclass,
                userclassname: classname,
                avatarUser: user.photoURL,
                createAt: new Date(),
                Teacher: teachername,
                answerlink: answerdos,
                studentskill: skilldos,

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
        document.getElementById("l2-course-form").reset();
    }
    ///////////// 

    ////submit function  
    const onSubmit = (e) => {

        var str = Qs.stringify(formData)


        e.preventDefault();
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSdJ1YCK8U3GyLtmu6ucU52cu7pOkNedf-6sqm7asKWRlq274w/formResponse', {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            mode: 'no-cors',
            body: str,
            redirect: 'follow'
        }).then(() => {
            respuesta();
            resetFields();
        })
        ///e.target.reset();

    };


    return (
        <>
            {waitingdos ? (

                <div className="App">
                    <header className="App-header">
                    
                    <form  onChange={onChange} className="trabajo-l2" id="l2-course-form">
	<fieldset>
		<div>
			<h2 className="L2">B14U6L2N</h2>
		</div>
	</fieldset>
	<fieldset>
		<div className="parrafo-dos">
			<p>Responde a las siguientes preguntas.</p>
		</div>
	</fieldset>
	<fieldset>
		<legend for="" className="leyenda-dos">Email</legend>
		<div class="form-group">
			<input id="emailAddress" type="email" name="emailAddress" class="form-control-estilo-dos" required/>
		</div>
	</fieldset>
	<fieldset>
		<legend for="716231463" className="leyenda-dos">1. Mi empresa necesita contratar a alguien que ________ varios códigos de programación.</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1393700542" value="conoce" required/>
					conoce
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1393700542" value="conocía" required/>
					conocía
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1393700542" value="conozca" required/>
					conozca
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="214565366" className="leyenda-dos">2. En mi trabajo me pagan muy poco. Necesito encontrar un trabajo en el que me __________ mejor.</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.517185688" value="pagan" required/>
					pagan
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.517185688" value="paguen" required/>
					paguen
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.517185688" value="pagamos" required/>
					pagamos
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="2015282755" className="leyenda-dos">3. Necesitamos encontrar al chico que ________ en esta empresa hace un año. ¿Alguien recuerda cómo se llamaba? </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1654019391" value="trabajó" required/>
					trabajó
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1654019391" value="trabaja" required/>
					trabaja
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1654019391" value="trabaje" required/>
					trabaje
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1559532276" className="leyenda-dos">4. null</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.701474427" value="quiere" required/>
					quiere
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.701474427" value="quiera" required/>
					quiera
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.701474427" value="querrán" required/>
					querrán
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1290104294" className="leyenda-dos">5. Buscamos guías de turismo que ______ trabajar a tiempo parcial o completo a jornada intensiva.</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1208772601" value="saben" required/>
					saben
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1208772601" value="entiendan" required/>
					entiendan
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1208772601" value="puedan" required/>
					puedan
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="189076065" className="leyenda-dos">6. Me __________ en un iglú, pero temo pasar frío.  </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1418730125" value="alojarías" required/>
					alojarías
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1418730125" value="alojaría" required/>
					alojaría
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.1418730125" value="alojo" required/>
					alojo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1728824291" className="leyenda-dos">7. Si no _________ tan friolento me alojaría en un iglú.</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2080926227" value="soy" required/>
					soy
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2080926227" value="era" required/>
					era
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2080926227" value="fuera" required/>
					fuera
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="701822805" className="leyenda-dos">8. ¿Cuál es el condicional simple del verbo caber?</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.233362501" value="cabría (yo)" required/>
					cabría (yo)
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.233362501" value="cabería (yo)" required/>
					cabería (yo)
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.233362501" value="ninguna de las dos formas anteriores" required/>
					ninguna de las dos formas anteriores
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="754874466" className="leyenda-dos">9. Con mi novia viajaríamos por todo el mundo si .......</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.445551925" value="teníamos tiempo y dinero suficiente" required/>
					teníamos tiempo y dinero suficiente
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.445551925" value="tengamos tiempo y dinero suficiente" required/>
					tengamos tiempo y dinero suficiente
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.445551925" value="tuviéramos tiempo y dinero suficiente." required/>
					tuviéramos tiempo y dinero suficiente.
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1085452241" className="leyenda-dos">10. Si vosotros ___________ la lotería, ¿dejaríais de trabajar?</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2091231300" value="ganarais" required/>
					ganarais
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2091231300" value="ganaseis" required/>
					ganaseis
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-dos">
					<input type="radio" name="entry.2091231300" value="las dos opciones anteriores son correctas" required/>
					las dos opciones anteriores son correctas
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
                        <p className="not-assigned-dos">
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
export default L2work;