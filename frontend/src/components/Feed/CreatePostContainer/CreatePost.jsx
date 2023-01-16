/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import croix from "../../../assets/croix.png";
import myAvatar from "../../../assets/my-avatar.jpeg";
import "../../../App.css";
import SelectBar from "./SelectBar";
import ModalCreatePost from "./ModalCreatePost";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import { useCurrentUserContext } from "../../../contexts/userContext";

function CreatePost() {
  const { valueGroupe, valueCategory, setShowCreatePost, showCreatePost } =
    usePostUserContext();
  const { user } = useCurrentUserContext();

  const [dataPost, setDataPost] = useState({
    title: "",
    content: "",
    user_id: user.id,
    category_id: "",
  });

  const [showCategories, setShowCategories] = useState(false);

  const onChange = (e) => {
    setDataPost({
      ...dataPost,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(dataPost);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    if (
      dataPost.title &&
      dataPost.content &&
      user.user_id &&
      dataPost.category_id
    ) {
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`http://localhost:5000/api/posts`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          Navigate("/feed");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-white w-[100%] h-[100vh] z-10">
      <div className="bg-white">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <img className="ml-2 mt-6" src={croix} alt="" />
          </button>
        </div>
        <div className="shadow-md my-[32px]">
          <h1 className="text-[32px] leading-[2.9rem] text-primary font-bold text-center pb-8 ">
            Créer une publication
          </h1>
        </div>

        {/* Formulaire Pour publier un post  */}
        <form onSubmit={(e) => onSubmit(e)} method="PUT">
          <div className="flex items-center">
            <img className="rounded-full w-28 ml-3" src={myAvatar} alt="" />
            <div className="block text-left">
              <div className="flex">
                <h2
                  className="text-xl ml-[24px] text-primary font-bold "
                  value={user.firstname}
                >
                  {user.firstname}
                </h2>
                <h2
                  className="text-xl ml-[24px] text-primary font-bold "
                  value={user.lastname}
                >
                  {user.lastname}
                </h2>
              </div>

              <p className="text-md ml-[24px] text-primary">group</p>
              <p className="text-md ml-[24px] text-primary">category</p>
            </div>
          </div>
          <div>
            <input
              className="mt-8 h-[5em] w-full pl-8"
              type="text"
              placeholder="Titre...*"
              name="title"
              value={dataPost.title}
              onChange={onChange}
            />
            <hr className="h-[2px] bg-grey" />
            <input
              className="h-[10em] w-full pl-8"
              type="text"
              name="content"
              placeholder="Votre publication...*"
              value={dataPost.content}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            onClick={() =>
              console.warn(
                dataPost.content,
                dataPost.title,
                dataPost.category_id,
                user.id
              )
            }
            className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 mr-3
         rounded-[20px] justify-end"
          >
            Publier
          </button>
        </form>
        <hr className="h-[2px] bg-grey" />
        <SelectBar
          showCategories={showCategories}
          setShowCategories={setShowCategories}
        />
        {showCategories ? (
          <ModalCreatePost
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreatePost;
