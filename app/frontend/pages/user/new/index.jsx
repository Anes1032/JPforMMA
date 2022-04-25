import { useState } from "react";
import Router from "next/router";
import classnames from "classnames";
import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/user/new/index.module.scss";

const New = () => {
  const items = [
    {
      name: "ユーザー名",
      key: "name",
      type: "text",
      error: "入力必須項目です",
    },
    {
      name: "メールアドレス",
      key: "email",
      type: "email",
      error: "正しいメールアドレスを入力してください",
    },
    {
      name: "パスワード",
      key: "password",
      type: "password",
      error: "８文字以上で入力してください",
    },
    {
      name: "パスワード確認",
      key: "password_confirmation",
      type: "password",
      error: "パスワードが異なります",
    },
  ];
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
  const updateFormState = (key, value) => {
    const copiedFromState = { ...formState };
    copiedFromState[key]["value"] = value;
    setFormState(copiedFromState);
  };
  const checkError = (key) => {
    return formState[key]["error"];
  };
  const createUser = async () => {
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
      const options = {
        key: "user_create",
        params: {
          name: formState["name"]["value"],
          email: formState["email"]["value"],
          password: formState["password"]["value"],
        },
      };
      const result = await new Api(options).postData();
      if (result.status === "SUCCESS") {
        Router.push("/user/new/thanks");
      } else {
        alert(result.message);
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
            {items.map((item) => (
              <div className={style.block} key={item.key}>
                <div className={style.inner}>
                  <label className={style.label}>{item.name}</label>
                  <input
                    className={classnames(
                      style.input,
                      checkError(item.key) ? style.error : ""
                    )}
                    name={item.key}
                    type={item.type}
                    onChange={(e) => updateFormState(item.key, e.target.value)}
                  />
                </div>
                {checkError(item.key) && (
                  <p className={style.error_text}>{item.error}</p>
                )}
              </div>
            ))}
            <div className={style.btn}>
              <button className={style.text} type="button" onClick={createUser}>
                会員登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default New;
