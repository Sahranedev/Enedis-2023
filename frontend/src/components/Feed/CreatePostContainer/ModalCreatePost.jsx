import { useState } from "react";
import croix from "../../../assets/croix.png";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function ModalCreatePost({ showCategories, setShowCategories }) {
  const {
    groupList,
    categoryList,
    setValueSelectedCategory,
    setValueSelectedGroup,
  } = usePostUserContext();

  // ferme la modale des groupes avec la croix
  function closeModal() {
    setShowCategories(!showCategories);
  }

  // function pour récuperer la valeur inscrit dans le input et
  // la transférer à filterSearch pour filter par nom de groupe
  const [filterSearch, setFilterSearch] = useState("");
  function handleSearch(e) {
    setFilterSearch(e.target.value);
  }

  function handleValue(category) {
    setValueSelectedCategory(category);
    setShowCategories(!showCategories);
  }
  return (
    <div>
      <div className="fixed top-0 bg-white w-[101%] h-[100vh]">
        <button type="button" onClick={() => closeModal()}>
          <img className="ml-2 mt-6" src={croix} alt="" />
        </button>
        <h1 className="text-[32px] text-primary font-bold text-center ">
          Choisir un groupe et une catégorie
        </h1>
        <div className=" w-full">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cherchez un groupe..."
            className="border rounded-xl border-primary mx-auto w-[280px] h-11 my-10 ml-16 pl-4"
          />
        </div>
        <div className="w-full mt-4">
          <div className="dropdown inline-block relative w-full">
            <ul>
              {groupList
                .filter((group) => {
                  return group.group_name
                    .toLowerCase()
                    .includes(filterSearch.toLowerCase());
                })
                .map((group) => (
                  <button
                    type="button"
                    onClick={() => setValueSelectedGroup(group.group_name)}
                    className="dropdown-menu text-lg px-10 font-normal text-primary pt-5 shadow-md"
                    value={group.group_name}
                    key={group.id}
                  >
                    {group.group_name}
                    <ul>
                      {categoryList
                        .filter((category) => category.group_id === group.id)
                        .map((category) => (
                          <li key={category.id}>
                            <button
                              type="button"
                              value={category.id}
                              name={category.name}
                              className="cursor-pointer h-10  hover:bg-violet"
                              onClick={() => handleValue(category)}
                            >
                              {category.category_name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </button>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreatePost;
