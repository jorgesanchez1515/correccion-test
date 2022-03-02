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

const answerdos = "https://docs.google.com/spreadsheets/d/1MphNh00SppsGeQniIMtdXlafQxxLdRyCykkVvAyJYEs/edit?usp=forms_web_b#gid=459763412";

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
    useEffect(() => {
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
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSc60IwlGBf3BOlVPkZVIHrvfywiWV-6zW6uLNADr2beTdPwIQ/formResponse', {
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
                        <form onChange={onChange} className="trabajo-l2" id="l2-course-form">
                            <fieldset>
                                <div ><h2 className="L2">A11U2L2</h2></div>
                            </fieldset>
                            <fieldset>
                                <div className="parrafo-dos"><p>Elige la respuesta correcta.</p></div>
                            </fieldset>


                            <fieldset>
                                <legend for="" className="leyenda-dos">Email</legend>
                                <div class="form-group">
                                    <input id="emailAddress" type="email" name="emailAddress" class="form-control-estilo-dos" required />
                                </div>

                            </fieldset>

                            <fieldset>
                                <legend for="1973510384" className="leyenda-dos">1. Estos pantalones son ______</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1228178922" value="rojas." required />
                                            rojas.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1228178922" value="rojos." required />
                                            rojos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1228178922" value="rojo." required />
                                            rojo.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1720566810" className="leyenda-dos">2. Mi hermana es ________ en un hospital.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1295356207" value="doctora." required />
                                            doctora.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1295356207" value="doctor." required />
                                            doctor.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1295356207" value="doctoras." required />
                                            doctoras.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1822089441" className="leyenda-dos">3. Mi abuela ________ setenta años.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1317907344" value="tengo" required />
                                            tengo
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1317907344" value="tienen" required />
                                            tienen
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1317907344" value="tiene" required />
                                            tiene
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="1818622652" className="leyenda-dos">4. ¿Cuántos años _______ tus padres?</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.2047532337" value="tenéis" required />
                                            tenéis
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.2047532337" value="tienen" required />
                                            tienen
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.2047532337" value="tiene" required />
                                            tiene
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="2090273787" className="leyenda-dos">5. Mi hermana ________ un vestido _______.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.817103149" value="llevas / blanco." required />
                                            llevas / blanco.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.817103149" value="llevas / blanca." required />
                                            llevas / blanca.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.817103149" value="lleva / blanco." required />
                                            lleva / blanco.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend for="654801569" className="leyenda-dos">6. _________ padre es profesor en la universidad.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1111894272" value="Nuestros" required />
                                            Nuestros
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1111894272" value="Nuestro" required />
                                            Nuestro
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1111894272" value="Tus" required />
                                            Tus
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="688655782" className="leyenda-dos">7. _____ camisas son rojas.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.671092758" value="Sus" required />
                                            Sus
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.671092758" value="Tu" required />
                                            Tu
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.671092758" value="Nuestros" required />
                                            Nuestros
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend for="1968688822" className="leyenda-dos">8. ________ chaquetas son _______.</legend>
                                <div class="form-group">
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1486510538" value="Estos / rojos." required />
                                            Estos / rojos.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1486510538" value="Estas / verdes." required />
                                            Estas / verdes.
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label className="etiqueta-dos">
                                            <input type="radio" name="entry.1486510538" value="Aquellos / verdes." required />
                                            Aquellos / verdes.
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <input type="hidden" name="fvv" value="1" />
                            <input type="hidden" name="fbzx" value="6822489034396516105" />

                            <input type="hidden" name="pageHistory" value="0" />
                            <div class="center">
                                <Button className="btn-primary-dos" onClick={onSubmit} isLoading={isLoading}>Send</Button>
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