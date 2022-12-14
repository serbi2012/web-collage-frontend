import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import { setUrlAddress } from "../../redux/reducers/urlAddress";
import manipulateDom from "../../../utils/manipulateDom";
import { getCookie, deleteCookie } from "../../../utils/manageCookie";

const AddressBarBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 250px;
  top: 10px;
  background-color: ${COLORS.SUB_COLOR};
  border-radius: 5px;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease-in-out;
  z-index: 2000000;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px;
    width: 250px;

    input {
      padding: 5px 10px;
      width: 250px;
      border-radius: 5px;

      :focus {
        outline: none;
      }
    }
  }

  .changeUrlButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    height: 30px;
    width: 40px;
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    :hover {
      opacity: 0.9;
    }

    :active {
      opacity: 0.7;
    }
  }

  .foldButton {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.SUB_COLOR};
    height: 60px;
    width: 50px;
    color: ${COLORS.MAIN_COLOR};
    border-radius: 50px;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    user-select: none;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    z-index: -1;

    :hover {
      opacity: 0.9;
    }

    :active {
      opacity: 0.7;
    }
  }
`;

const AddressBarBox = ({
  isAddressBarFold,
  setIsAddressBarFold,
  setWebContainerDom,
}) => {
  const { urlAddress } = useSelector(({ urlAddress }) => urlAddress);

  const [urlAddressInput, setUrlAddressInput] = useState("");

  const dispatch = useDispatch();

  const connectToUrlAddressOnClick = async (event) => {
    event.preventDefault();

    const sourceDomain = urlAddress.slice(`https://`.length).split("/").shift();

    const { data } = await axios.get(urlAddress);
    const htmlString = manipulateDom(data, sourceDomain);

    dispatch(setUrlAddress(urlAddressInput));

    if (getCookie("urlAddress")) {
      deleteCookie("urlAddress");
    }

    setWebContainerDom(htmlString);
  };

  return (
    <AddressBarBoxContainer
      style={{
        transform: isAddressBarFold ? "translateY(-65px)" : "translateY(15px)",
      }}
    >
      <form onSubmit={connectToUrlAddressOnClick}>
        <input
          type="url"
          data-testid="addressInput"
          defaultValue={
            getCookie("urlAddress") ||
            urlAddress ||
            "https://eye-catch-danke-foresight.w3spaces.com"
          }
          onChange={(event) => {
            setUrlAddressInput(event.target.value);
          }}
        />
        <span
          data-testid="addressConnect"
          className="material-symbols-outlined changeUrlButton"
          onClick={connectToUrlAddressOnClick}
        >
          arrow_forward
        </span>
      </form>
      <div
        className="foldButton"
        onClick={() => {
          setIsAddressBarFold(!isAddressBarFold);
        }}
        style={{
          transform: isAddressBarFold
            ? "translateY(28px)"
            : "translateY(-18px)",
        }}
      >
        <span className="material-symbols-outlined">arrow_drop_up</span>
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </div>
    </AddressBarBoxContainer>
  );
};

export default AddressBarBox;
