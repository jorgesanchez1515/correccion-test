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

const answer = "https://docs.google.com/spreadsheets/d/1GAlVXUnoBw9cnHuapAUZMmXQW-7cng-GLWlwL4IbkpU/edit#gid=606518558";

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
        fetch('https://docs.google.com/forms/d/e/1FAIpQLScuWHYCd9G15jJkXqJob-GKBXtcuOnheF6XlOZgO6dcr9lU4w/formResponse', {
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
                        <form onChange={onChange} className="trabajo-l1" id="l1-course-form">
                            <fieldset>
                                <div ><h2 className="L1">A11U2L1</h2></div>
                            </fieldset>
                            <fieldset>
                                <div className="parrafo-uno"><p>Responde a las siguientes preguntas.</p></div>
                            </fieldset>
                            <fieldset>
                                <legend for="" className="leyenda">Email</legend>
                                <div class="form-group">
                                    <input id="emailAddress" type="email" name="emailAddress" class="form-control-estilo" required />
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="876166409" className="leyenda">1. Mi pelo es ________</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.392373502" value="moreno." required />
                                            moreno.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.392373502" value="rubia." required />
                                            rubia.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.392373502" value="castaños." required />
                                            castaños.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1878166220" className="leyenda">2. ¿Qué relación tiene la mujer con la chica?</legend>
                                <div>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/general-spanish.appspot.com/o/A1.1%2FA1.1%20Unit%202%2FA1.1%20Unit%202%20L1%2FAbuela%20actividades%20adicionales.jpg?alt=media&token=f9ae9f97-f350-4928-a0b4-5c94baeb175c'} alt="boohoo" className="image" />
                                </div>

                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.321543440" value="Es su hija." required />
                                            Es su hija.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.321543440" value="Es su abuelo." required />
                                            Es su abuelo.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.321543440" value="Es su abuela." required />
                                            Es su abuela.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="300235612" className="leyenda">3. ¿De qué color son los ojos?</legend>
                                <div>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/general-spanish.appspot.com/o/A1.1%2FA1.1%20Unit%202%2FA1.1%20Unit%202%20L1%2FOjos%20marrones%20actividades%20l1.jpg?alt=media&token=795eb68e-82a2-44fa-923f-ecc892fbe731'} alt="boohoo" className="image" />
                                </div>

                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.2085992508" value="Azules." required />
                                            Azules.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.2085992508" value="Rojos." required />
                                            Rojos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.2085992508" value="Marrones." required />
                                            Marrones.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>



                            <fieldset>
                                <legend for="1668449154" className="leyenda">4. ¿De qué color es la camisa?</legend>
                                <div>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/general-spanish.appspot.com/o/A1.1%2FA1.1%20Unit%202%2FA1.1%20Unit%202%20L1%2FCamisa%20blanca%20actividades%20l1.jpg?alt=media&token=e743ccdc-104a-4394-ad6d-0ba19467f3a8'} alt="boohoo" className="image" />
                                </div>

                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.322833172" value="Negra." required />
                                            Negra.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.322833172" value="Blanca." required />
                                            Blanca.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.322833172" value="Azul." required />
                                            Azul.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="1255745961" className="leyenda">5. ¿Qué llevan el chico y la chica?</legend>
                                <div>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/general-spanish.appspot.com/o/A1.1%2FA1.1%20Unit%202%2FA1.1%20Unit%202%20L1%2FVestido%20y%20pantalones.jpg?alt=media&token=c447a1f9-49c8-4a01-822d-b13b4fa03a03'} alt="boohoo" className="image" />
                                </div>

                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1727956501" value="Un vestido y unos pantalones blancos." required />
                                            Un vestido y unos pantalones blancos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1727956501" value="Un vestido negro y unos pantalones blancos." required />
                                            Un vestido negro y unos pantalones blancos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1727956501" value="Un vestido y unos pantalones negros." required />
                                            Un vestido y unos pantalones negros.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1727956501" value="Un vestido blanco y unos pantalones negros." required />
                                            Un vestido blanco y unos pantalones negros.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="1286544654" className="leyenda">6. ¿Qué relación tienen estas personas?</legend>
                                <div>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/general-spanish.appspot.com/o/A1.1%2FA1.1%20Unit%202%2FA1.1%20Unit%202%20L1%2FPadre%20e%20hijo%20gf%20l1%20U2.jpg?alt=media&token=b4e6bc3b-b1c2-4ecc-8e57-3948a99c7b2f'} alt="boohoo" className="image" />
                                </div>

                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1308821929" value="Son abuelo y abuela." required />
                                            Son abuelo y abuela.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1308821929" value="Son hijo y padre." required />
                                            Son hijo y padre.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta">
                                            <input type="radio" name="entry.1308821929" value="Son hijo y madre." required />
                                            Son hijo y madre.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <input type="hidden" name="fvv" value="1" />
                            <input type="hidden" name="fbzx" value="8461977738504272510" />

                            <input type="hidden" name="pageHistory" value="0" />

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