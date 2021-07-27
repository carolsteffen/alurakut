import React from "react";
// Hook do NextJS
import { useRouter } from "next/router";

import nookies from "nookies"; //para trabalhar com cookies no client e/ou no server

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState("carolsteffen");

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form
            className="box"
            onSubmit={(infoEvents) => {
              infoEvents.preventDefault(); //padrão -> action="/"

              fetch("https://alurakut.vercel.app/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", //tipo de conteúdo enviado
                },
                body: JSON.stringify({ githubUser: githubUser }), //info a ser enviada
              }).then(async (answerServer) => {
                const dataAnswer = await answerServer.json();
                const token = dataAnswer.token;
                //nookies tem 3 funções: set, get e destroy
                nookies.set(null, "USER_TOKEN", token, {
                  path: "/",
                  maxAge: 86400 * 7,
                });
                router.push("/"); //rota
              });
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser} //value que precisa ser mudado necessita do onChange
              onChange={(event) => {
                setGithubUser(event.target.value); //target para pegar o elemento, e o value para o valor digitado
              }}
            />
            {githubUser.length === 0 ? "Preencha o campo" : ""}
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRE JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
