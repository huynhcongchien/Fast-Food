import React, { Component } from 'react'
import AutoComplete from 'react-google-autocomplete';
import key from '../../config/googlemap';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            password: '',
            phoneNumber: '',
            description: '',
            username: '',
            location: {},
        }
    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onSelected = (place) => {
        this.setState({
            address: place.formatted_address,
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
        })
    }

    onClickRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((doc)=>{
            doc.user.updateProfile({
                displayName:this.state.username
            })
            firebase.firestore().collection('restaurants').doc(doc.user.uid)
            .set({
                name: this.state.name,
                address: this.state.address,
                location: this.state.location,
                description: this.state.description,
                phoneNumber: this.state.phoneNumber,
                username: this.state.username,
                categories: []
            })
            .then(()=>{
                
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
    }

    render() {
        return (
            <div id="root">
                <div className="App">
                    <header className="sc-AxjAm jSFHNi"><a href="/"><img src="/images/logo_web-2.png" alt="" /></a>
                        <div> <Link to="/login" className="sc-AxirZ eXnrgg"><svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" size={20} height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                        </svg>????ng nh???p</Link><a href="/register" className="sc-AxirZ kykAwD">????ng k??</a></div>
                    </header>
                    <div className="sc-fzozJi dsnOpO">
                        <div className="home-container">
                            <div className="sc-fzoLsD kQmsoI">
                                <h2>H???p t??c v???i ch??ng t??i v?? nh???n th??m doanh thu</h2>
                                <p>Doof Tsaf l?? m???t n???n t???ng c??ng ngh??? gi??p c??c doanh nghi???p m??? r???ng ph???m vi ti???p c???n, l??m h??i l??ng kh??ch
                                h??ng, v?? th??c ?????y l???i nhu???n c???a h???. H???p t??c v???i ch??ng t??i h??m nay</p>
                            </div>
                            <div className="sc-fzpans faylyw item-container  form-container">
                                <h2>????ng k?? ngay</h2>
                                <form>
                                    <div className="sc-fzplWN kXmefM">
                                        <input onChange={this.onChangeInput} type="text" placeholder="T??n c???a h??ng"
                                            name="name" className="sc-AxiKw dVlCBT" />
                                        <AutoComplete onPlaceSelected={this.onSelected} apiKey={key} types={['address']}
                                            placeholder="?????a ch???" className="sc-AxiKw dVlCBT" componentRestrictions={{ country: "VN" }} />
                                        <input type="text" name="username" onChange={this.onChangeInput}
                                            placeholder="T??n ng?????i ????ng k??" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <div className="sc-fzplWN kXmefM">
                                        <input type="number" name="phoneNumber" onChange={this.onChangeInput}
                                            placeholder="S??? ??i???n tho???i" className="sc-AxiKw dVlCBT" />
                                        <input type="email" name="email" placeholder="Email" onChange={this.onChangeInput}
                                            className="sc-AxiKw dVlCBT" />
                                        <input type="password" name="password" onChange={this.onChangeInput}
                                            placeholder="M???t kh???u" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <div className="sc-fzplWN kXmefM">
                                        <input type="text" name="description" onChange={this.onChangeInput}
                                            placeholder="M?? t???" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <button onClick= {this.onClickRegister} type="button" className="sc-AxhCb gxxaVj">????ng k??</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
