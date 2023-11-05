import { useState } from "react"

import Head from "next/head"

import PageTitle from "../../components/page-header"
import Header from "../../components/header"
import Container from "../../components/container"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"
import Description from "../../components/description"

import styles from "../form1/style.module.css"

type LoginData = {
  id: string
  password: string
}

const Form7 = () => {
  const [formData, setFormData] = useState<LoginData>({
    id: "",
    password: ""
  })
  // id, passwordがちゃんと入力されているか
  const [isInputForm, setIsInputForm] = useState({
    id: false,
    password: false
  })
  // フォーム全体として送信可能な状態か
  const [isFormValid, setIsFormValid] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false)
  const [isIdValid, setIsInputValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const trimmedValue = value.trim()

    const data = {...formData, [name]: trimmedValue}

    setFormData(data)

    checkFormValid(data)
  }

  // 入力内容から送信ボタンのON/OFFを切り替える
  const checkFormValid = ({id, password}: LoginData) => {
    if (id && password) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin) {
      setIsLoading(true)

      const data = await fetch("/api/api5", {
        method: "POST",
        body: JSON.stringify({ id: formData.id, password: formData.password }),
        headers: { "Content-Type": "application/json" }
      })

      setIsLoading(false)

      if (data.ok) {
        setIsLogin(true)
        setIsLoginFailed(false)
      } else {
        const res = await data.json()
        setIsLoginFailed(true)
      }
    } else {
      // ログアウト
      setIsLogin(false)
    }
  }

  return (
    <>
      <Head>
        <title>Form7 | MyForms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form7"
        postdate="2023-07-25"
        update="2023-11-05"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            ログインフォーム
          </h3>

          <p className={styles.text}>ユーザーIDとパスワードを入力してください<br />（ID = user、パスワード = pass でログインできます）。</p>

          <form
            className={styles.form}
            onSubmit={submit}
          >
            <label htmlFor="id" className={styles.label}>
              ユーザーID
            </label>

            <input
              id="id"
              name="id"
              className={styles.input}
              placeholder="id"
              onChange={handleChange}
              required
              disabled={isLogin}
            />

            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>

            <input
              id="password"
              name="password"
              className={styles.input}
              placeholder="password"
              onChange={handleChange}
              required
              disabled={isLogin}
            />

            {isLoginFailed && (
              <p
                className={styles.errorMessage}
                data-testid="error-message"
              >
                ユーザーID、パスワードの入力に間違いがあるか、ユーザー登録がされていません。
              </p>
            )}

            {isLogin && (
              <p
                className={styles.successMessage}
              >
                ログインに成功しました！
              </p>
            )}

            {isLogin
              ? (
                <button
                  className={styles.button}
                  type="submit"
                >
                  ログアウト
                </button>
              ) : (
                <>
                  {isLoading
                    ? (
                      <p>認証中...</p>
                    ) : (
                      <button
                        className={styles.button}
                        type="submit"
                        disabled={!isFormValid}
                      >
                        ログイン
                      </button>
                    )}
                  </>
                )
            }

          </form>
        </div>

        <Description>
          <p>11月5日時点、作業中。。。👷‍♂️</p>
        </Description>

        <PageLink prev="6" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form7
