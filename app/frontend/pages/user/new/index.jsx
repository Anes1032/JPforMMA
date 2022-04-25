import { useState } from "react";
import Router from "next/router";
import classnames from "classnames";
import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/user/new/index.module.scss";

const New = () => {
  const initialFormState = {
    name: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    password_confirmation: {
      value: "",
      error: false,
    },
  };
  const [formState, setFormState] = useState(initialFormState);
  const [usedEmailError, setUsedEmailError] = useState(false);
  const updateFormState = (key, value) => {
    const copiedFromState = { ...formState };
    copiedFromState[key]["value"] = value;
    setFormState(copiedFromState);
  };
  const checkError = (key) => {
    return formState[key]["error"];
  };
  const createUser = async () => {
    console.log(formState);
    const copiedFromState = { ...formState };
    const emailValidateRule =
      /^[a-zA-Z0-9\t"\\.!#$%&'*\+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordValidateRule = /^([a-zA-Z0-9-_]{8,})$/;
    copiedFromState["name"]["error"] =
      formState["name"]["value"] !== "" ? false : true;
    copiedFromState["email"]["error"] = formState["email"]["value"].match(
      emailValidateRule
    )
      ? false
      : true;
    copiedFromState["password"]["error"] = formState["password"]["value"].match(
      passwordValidateRule
    )
      ? false
      : true;
    copiedFromState["password_confirmation"]["error"] =
      formState["password_confirmation"]["value"] ===
      formState["password"]["value"]
        ? false
        : true;
    if (
      Object.keys(copiedFromState).every((el) => copiedFromState[el]["value"])
    ) {
      const apiParams = {
        name: formState["name"]["value"],
        email: formState["email"]["value"],
        password: formState["password"]["value"],
      };
      const data = await new Api("user_create", apiParams).postData();
      if (data.status === "SUCCESS") {
        Router.push("/user/new/thanks");
      } else {
        console.log(data);
        setUsedEmailError(true);
      }
    } else {
      setFormState(copiedFromState);
    }
  };
  const title = "新規会員登録｜JP PORTAL for UFC";
  const canonical = buildCanonical("user", "new");
  return (
    <Layout title={title} canonical={canonical}>
      <div className={style.container}>
        <div className={style.content}>
          <h1 className={style.title}>新規会員登録</h1>
          <div
            className={style.form}
            method={"post"}
            action={"/api/auth/callback/credentials"}
          >
            <div className={style.block}>
              <label className={style.label}>ユーザー名</label>
              <input
                className={classnames(
                  style.input,
                  checkError("name") ? style.error : ""
                )}
                name={"name"}
                onChange={(e) => updateFormState("name", e.target.value)}
              />
            </div>
            {checkError("name") && (
              <p className={style.error_text}>入力必須項目です</p>
            )}
            <div className={style.block}>
              <label className={style.label}>メールアドレス</label>
              <input
                className={classnames(
                  style.input,
                  checkError("email") ? style.error : ""
                )}
                name={"email"}
                onChange={(e) => updateFormState("email", e.target.value)}
              />
            </div>
            {checkError("email") && (
              <p className={style.error_text}>
                正しいメールアドレスを入力してください
              </p>
            )}
            <div className={style.block}>
              <label className={style.label}>パスワード</label>
              <input
                className={classnames(
                  style.input,
                  checkError("password") ? style.error : ""
                )}
                name={"password"}
                type={"password"}
                onChange={(e) => updateFormState("password", e.target.value)}
              />
            </div>
            {checkError("password") && (
              <p className={style.error_text}>８文字以上で入力してください</p>
            )}
            <div className={style.block}>
              <label className={style.label}>パスワード確認</label>
              <input
                className={classnames(
                  style.input,
                  checkError("password_confirmation") ? style.error : ""
                )}
                name={"password_confirmation"}
                type={"password"}
                onChange={(e) =>
                  updateFormState("password_confirmation", e.target.value)
                }
              />
            </div>
            {checkError("password_confirmation") && (
              <p className={style.error_text}>パスワードが異なります</p>
            )}
            <div className={style.btn}>
              <button className={style.text} type="button" onClick={createUser}>
                会員登録
              </button>
            </div>
            {usedEmailError && (
              <p className={style.error_message}>
                既に登録されているメールアドレスです
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default New;
