import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserAction, logoutUserAction } from '../../redux/Actions/UserAction'
import { useEffect } from 'react'
import './account.scss'

const Account = () => {
    const { userInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(logoutUserAction())
        navigate("/")
    }
    useEffect(() => {
        dispatch(getUserAction())
    }, [])

    return (
        <div id="hesab">
            <div className="container">
                <div className="row">
                    <div id="accoutPage">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="card p-3">
                                        <div className="card-body">
                                            <h5>{userInfo.fullName}</h5>
                                            <span>Siz artıq hesaba daxil olmusunuz</span>
                                            <div className="buttonBox" onClick={() => logOut()}>
                                                <button>
                                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                                    <span>Çıxış</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account