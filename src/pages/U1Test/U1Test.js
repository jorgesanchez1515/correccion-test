import React, { useState, useEffect } from 'react'
import { Button, Container } from "semantic-ui-react";
import { Radio } from 'react-bootstrap';
import { toast } from "react-toastify";
import { isWaitingAnswers } from '../../utils/Api';
import { map } from "lodash";
// import axios from 'axios';
import Qs from "qs";
import firebase from "../../utils/Firebase";
import logo from '../../logo.svg';
import './U1Test.scss';

const db = firebase.firestore(firebase);


const answertres = "https://docs.google.com/spreadsheets/d/1xKGyGWcDC4ux1VRd1CxrCfQ2ty_QsdTF8NFbTBy1k_Q/edit?resourcekey#gid=1736934562";

const skilltres = "Test";

function U1Test(props) {

    const { user, setReloadApp, idclass, classname, teachername } = props;
    //console.log(idclass);
    //console.log(user.uid); 
    const [formData, setformData] = useState("");
    const [waitingtres, setWaitingtres] = useState(false);
    const [userDetailstres, setUserDetailstres] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //  const [teacheridtres, setTeacheridtres] = useState(null);
    //console.log(userDetailstres);
    //console.log(teachername);
    //console.log(idclass);
    //console.log(classname);


    ////////////////course details user
    /*useEffect(() => {
        db.collection('waiting')
            .doc(user.uid).get()
            .then(snapshot => setUserDetailstres(snapshot.data()))
        //   setMyclass(arrayofClasses);

    }, [])
    ////////////////

    ////////////set is waiting answers  
    useEffect(() => {
        isWaitingAnswers(user.uid).then(response => {
            setWaitingtres(response);
            // console.log(response);
        });
    }, [user])*/
    
	
	   // Course details user
	   useEffect(() => {
		if(!idclass) 
			return
		
		db.collection("studentclass")
		.doc(idclass)
		.get()
		.then(response => {
			const data = response?.data()

			setUserDetailstres({
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
				if(elem.answerlink == answertres)
					result = false
			})

			setWaitingtres(result)
		})
    }, [user]) 
	

	/////////formdata state  
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
                userwork: "U1Test",
                usercourse: userDetailstres.course,
                userlevel: userDetailstres.level,
                userclassid: idclass,
                userclassname: classname,
                avatarUser: user.photoURL,
                createAt: new Date(),
                Teacher: teachername,
                answerlink: answertres,
                studentskill: skilltres,

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
        document.getElementById("u1-course-form").reset();
    }
    /////////////  

    ///////////delete function
    const borrar = () => {
        //console.log(cartid);
        db.collection('waiting')
            .doc(user.uid)
            .delete()
            .then(() => {
                // console.log("unit exercises completed!");
                toast.success("You already completed the unit exercises.");
                setReloadApp(prevState => !prevState);
                //this.props.history.push("/")
                //window.location.reload();
            }).catch((error) => {
                toast.error("Error completing the unit exercises.");
                // console.error("Error removing document: ", error);
            });
    }

    ////////// on submit function
    const onSubmit = (e) => {

        //  console.log(formData);

        var str = Qs.stringify(formData)


        e.preventDefault();
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSetLwCXC-OmbSPkHAZiOINzN0QmGLAdLRLD2jKU7JJzZ3eezw/formResponse', {
            method: 'post',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: str,
            redirect: 'follow'
        }).then(() => {
            respuesta();
            resetFields();
            borrar();
            setReloadApp(prevState => !prevState);
        })


    }
    ////////
    return (
        <>
            {waitingtres ? (

                <div className="App">
                    <header className="App-header">
                    
                    <form  onChange={onChange} className="trabajo-U1" id="u1-course-form">
	<fieldset>
		<div>
			<h2 className="U1">B14U6NTEST</h2>
		</div>
	</fieldset>
	<fieldset>
		<div className="parrafo-u1">
			<p>Responde a las siguientes preguntas.</p>
		</div>
	</fieldset>
	<fieldset>
		<legend for="" className="leyenda-tres">Email</legend>
		<div class="form-group">
			<input id="emailAddress" type="email" name="emailAddress" class="form-control-estilo-tres" required/>
		</div>
	</fieldset>
	<fieldset>
		<legend for="716231463" className="leyenda-tres">1. ??Cu??l de las siguientes estructuras no es correcta en ning??n caso?</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1393700542" value="Si + pret??rito imperfecto de subjuntivo" required/>
					Si + pret??rito imperfecto de subjuntivo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1393700542" value="Si + presente de indicativo" required/>
					Si + presente de indicativo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1393700542" value="Si + presente de subjuntivo" required/>
					Si + presente de subjuntivo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="214565366" className="leyenda-tres">2. Una frase en condicional simple normalmente va acompa??ada de una frase en...</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.517185688" value="condicional compuesto" required/>
					condicional compuesto
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.517185688" value="pret??rito imperfecto de subjuntivo" required/>
					pret??rito imperfecto de subjuntivo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.517185688" value="pret??rito imperfecto de indicativo" required/>
					pret??rito imperfecto de indicativo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="2015282755" className="leyenda-tres">3. Una frase condicional contrafactual hace referencia a un hecho que...</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1654019391" value="ser?? realidad en un futuro pr??ximo seg??n la previsi??n del hablante." required/>
					ser?? realidad en un futuro pr??ximo seg??n la previsi??n del hablante.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1654019391" value="no ser?? realidad nunca seg??n la previsi??n del hablante." required/>
					no ser?? realidad nunca seg??n la previsi??n del hablante.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1654019391" value="ser?? realidad en un futuro cercano seg??n la previsi??n del hablante." required/>
					ser?? realidad en un futuro cercano seg??n la previsi??n del hablante.
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1559532276" className="leyenda-tres">4. El pret??rito imperfecto de subjuntivo comparte elementos formales con...</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.701474427" value="el pret??rito indefinido de indicativo." required/>
					el pret??rito indefinido de indicativo.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.701474427" value="el pret??rito perfecto de indicativo." required/>
					el pret??rito perfecto de indicativo.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.701474427" value="el pret??rito imperfecto de indicativo." required/>
					el pret??rito imperfecto de indicativo.
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1290104294" className="leyenda-tres">5. Si una persona comienza una frase diciendo: "Si tuviera dinero....." significa que:</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1208772601" value="esa persona no est?? segura de si tiene dinero o no." required/>
					esa persona no est?? segura de si tiene dinero o no.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1208772601" value="esa persona tiene dinero." required/>
					esa persona tiene dinero.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1208772601" value="esa persona no tiene dinero." required/>
					esa persona no tiene dinero.
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="189076065" className="leyenda-tres">6. Si tuvieras una agencia de turismo dedicado al turismo aventura, ??cu??l de estas propuestas tur??sticas ofrecer??as?</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1418730125" value="un paseo de compras en un centro comercial de Miami" required/>
					un paseo de compras en un centro comercial de Miami
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1418730125" value="un vuelo en globo aerost??tico" required/>
					un vuelo en globo aerost??tico
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.1418730125" value="una visita a las ruinas del Coliseo romano" required/>
					una visita a las ruinas del Coliseo romano
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1728824291" className="leyenda-tres">7. Aunque tuviera mucho dinero, no lo gastar??a en una estancia en un ____________. Me parece un derroche de dinero. </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2080926227" value="lujo de hotel" required/>
					lujo de hotel
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2080926227" value="hotel lujo" required/>
					hotel lujo
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2080926227" value="hotel de lujo" required/>
					hotel de lujo
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="701822805" className="leyenda-tres">8. ??Qu?? deber??an hacer las compa????as de turismo si ____________ tener precios competitivos?</legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.233362501" value="quisieran" required/>
					quisieran
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.233362501" value="querr??an" required/>
					querr??an
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.233362501" value="quer??an" required/>
					quer??an
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="754874466" className="leyenda-tres">9. Google Maps es una __________ que utilizan los  viajeros para ubicarse en un lugar desconocido, encontrar lugares y servicios al turista.   </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.445551925" value="mapa" required/>
					mapa
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.445551925" value="internet" required/>
					internet
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.445551925" value="aplicaci??n" required/>
					aplicaci??n
				</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend for="1085452241" className="leyenda-tres">10. ??Cu??l de estas frases corresponde a una persona dedicada a los negocios tur??sticos? </legend>
		<div class="form-group">
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2091231300" value="Me encantar??a tener una agencia de turismo." required/>
					Me encantar??a tener una agencia de turismo.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2091231300" value="Me encanta tener una agencia de turismo." required/>
					Me encanta tener una agencia de turismo.
				</label>
			</div>
			<div class="radio">
				<label className="etiqueta-tres">
					<input type="radio" name="entry.2091231300" value="Ninguna de las dos opciones anteriores." required/>
					Ninguna de las dos opciones anteriores.
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
                        <p className="not-assigned-tres">
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
export default U1Test;