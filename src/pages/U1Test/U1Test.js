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


const answertres = "https://docs.google.com/spreadsheets/d/16zLYnZR2tikG8DnaitrJcvcwDWKKeHx6ZIZdovt00jE/edit#gid=510112155";

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
    useEffect(() => {
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
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSev2AR4dP7gwe-Mmwc4B6BZLs7Ufim2VQILXynPPd3X2JSQ0Q/formResponse', {
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
                        <form onChange={onChange} className="trabajo-U1" id="u1-course-form">
                            <fieldset>
                                <div ><h2 className="U1">A11U2 TEST</h2></div>
                            </fieldset>
                            <fieldset>
                                <div className="parrafo-u1"><p>Responde a las preguntas.</p></div>
                            </fieldset>


                            <fieldset>
                                <legend for="" className="leyenda-tres">Email</legend>
                                <div class="form-group">
                                    <input id="emailAddress" type="email" name="emailAddress" class="form-control-estilo-tres" required />
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="615003357" className="leyenda-tres">1. Mi madre es _____</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1349283883" value="alta." required />
                                            alta.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1349283883" value="bajo." required />
                                            bajo.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1349283883" value="guapas." required />
                                            guapas.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="35808740" className="leyenda-tres">2. Mi padre es _____</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.207786157" value="guapa." required />
                                            guapa.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.207786157" value="delgados." required />
                                            delgados.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.207786157" value="delgado." required />
                                            delgado.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1510723376" className="leyenda-tres">3. Yo ______ dos hermanas.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1334137399" value="tenemos" required />
                                            tenemos
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1334137399" value="tengo" required />
                                            tengo
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1334137399" value="tienes" required />
                                            tienes
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="379457921" className="leyenda-tres">4. Señala qué grupo de palabras se refieren al carácter de una persona.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.137986139" value="Padre, madre, hermano." required />
                                            Padre, madre, hermano.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.137986139" value="Alto, guapo, ojos azules." required />
                                            Alto, guapo, ojos azules.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.137986139" value="Simpático, ordenado, puntual," required />
                                            Simpático, ordenado, puntual,
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="2017414187" className="leyenda-tres">5. Señala la opción correcta.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1583870601" value="Yo llevo una camiseta rojo." required />
                                            Yo llevo una camiseta rojo.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1583870601" value="Yo llevo unos pantalones amarillos." required />
                                            Yo llevo unos pantalones amarillos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1583870601" value="Tú llevas una falda rojo." required />
                                            Tú llevas una falda rojo.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="1195985580" className="leyenda-tres">6. Indica el grupo de posesivos átonos.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1847724839" value="Mi, tu, su, nuestro, vuestra, su." required />
                                            Mi, tu, su, nuestro, vuestra, su.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1847724839" value="Este, esta, estos, estas." required />
                                            Este, esta, estos, estas.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1847724839" value="Aquel, aquella, aquellos, aquellas." required />
                                            Aquel, aquella, aquellos, aquellas.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1520070957" className="leyenda-tres">7. Ellos _______ veinticinco años.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.288877988" value="tengo" required />
                                            tengo
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.288877988" value="tienes" required />
                                            tienes
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.288877988" value="tienen" required />
                                            tienen
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1244616584" className="leyenda-tres">8. Mi abuelo tiene los ojos _______</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.197499075" value="azules." required />
                                            azules.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.197499075" value="verde." required />
                                            verde.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.197499075" value="marrón." required />
                                            marrón.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="1517152112" className="leyenda-tres">9. ¿Cuánto _______ esta camisa azul?</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1047741934" value="cuestan" required />
                                            cuestan
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1047741934" value="cuesta" required />
                                            cuesta
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.1047741934" value="cuesto" required />
                                            cuesto
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="829316483" className="leyenda-tres">10. ¿Qué número es este: 59?</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.455150019" value="Cinco y nueve." required />
                                            Cinco y nueve.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.455150019" value="Cincoenta y nueve." required />
                                            Cincoenta y nueve.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-tres">
                                            <input type="radio" name="entry.455150019" value="Cincuenta y nueve." required />
                                            Cincuenta y nueve.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <input type="hidden" name="fvv" value="1" />
                            <input type="hidden" name="fbzx" value="-7463818563038847979" />

                            <input type="hidden" name="pageHistory" value="0" />
                            <div class="center">
                                <Button className="btn-primary-tres" onClick={onSubmit} isLoading={isLoading}>Send</Button>
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