import React, { useState } from 'react';
import { useUser } from '../UserContext';
import userImage from '../assests/user.png';





function UserProfile() {


  const { loginUser, signUpUser } = useUser();
  
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const [shippingAddress, setShippingAddress] = useState("Add Shipping Address here");
  const [about, setAbout] = useState("Describe about yourself");

  const toggleEditMode = () => {
    setIsEditingShipping(!isEditingShipping);
  };

  const toggleEditModeAbout = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  const saveChanges = (newContent) => {
    setShippingAddress(newContent);
    setIsEditingShipping(false);
  };

  const saveChangesAbout = (newContent) => {
    setAbout(newContent);
    setIsEditingAbout(false);
  };

  let userName, userEmail;

  switch (true) {
    case Boolean(loginUser):
      userName = loginUser.userEmail.split('@')[0];
      userEmail = loginUser.userEmail;
      break;
    case Boolean(signUpUser):
      userName = signUpUser.userEmail.split('@')[0];
      userEmail = signUpUser.userEmail;
      break;
    default:
      userName = "Guest";
      userEmail = "guest@example.com";
  }

  return (
    <>
      <main className='user-profile-sec'>
        <div className="container">
          <div className="profile-wrapper">
            <div className="row">
              <div className="col-lg-6 my-auto">
                <div className='user-left'>
                  <img src={userImage} alt="" className='image-fluid' />
                  <div className='d-flex gap-3 mt-4'>
                    <span>Name :</span> <p>{userName}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className='user-detail'>
                  <span>Email :</span> <p>{userEmail}</p>

                  <div className='d-flex flex-column w-100'>
                    <span>Shipping address :</span>
                    <div className='d-flex w-100'>
                      {
                        isEditingShipping ? (
                          <div className='d-flex flex-column w-100'>
                            <textarea
                              className='editer-inp'
                              defaultValue={shippingAddress}
                              onBlur={(e) => saveChanges(e.target.value)}
                            />
                            <div className='save-btn' onClick={() => saveChanges(shippingAddress)}>
                            <i className="bi bi-floppy" ></i>
                            <p> Save</p>
                            </div>
                            
                          </div>
                        ) : (
                          <>
                            <p className='m-0'>{shippingAddress}</p>
                            <i className="bi bi-pencil-square mt-1 ms-3" onClick={toggleEditMode}></i>
                          </>
                        )
                      }
                    </div>
                  </div>

                  <div className='d-flex flex-column w-100'>
                    <span>About :</span>
                    <div className='d-flex w-100'>
                      {
                        isEditingAbout ? (
                          <div className='d-flex flex-column w-100'>
                            <textarea
                              className='editer-inp'
                              defaultValue={about}
                              onBlur={(e) => saveChangesAbout(e.target.value)}
                            />
                            <div className='save-btn' onClick={() => saveChangesAbout(about)}>
                            <i className="bi bi-floppy" ></i>
                            <p> Save</p>
                            </div>
                           
                          </div>
                        ) : (
                          <>
                            <p className='m-0'>{about}</p>
                            <i className="bi bi-pencil-square mt-1 ms-3" onClick={toggleEditModeAbout}></i>
                          </>
                        )
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserProfile;
