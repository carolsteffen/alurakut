import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/components/lib/AluraCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(property) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${property.githubUser}.png`} />

      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${property.githubUser}`}
        >
          @{property.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(property) {
  console.log(property.items);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Seguidores ({property.items.length})</h2>

      <ul>
        {property.items.slice(0, 6).map((currentItem) => {
          return (
            <li key={currentItem.id}>
              <a href={``}>
                <img src={`https://github.com/${currentItem.login}.png`} />
                <span>{currentItem.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const githubUser = props.githubUser;

  const friends = [
    "guilhermegules",
    "maykbrito",
    "Franciellycs",
    "carooxs",
    "juunegreiros",
    "Bullas",
  ];

  const [community, setCommunity] = React.useState([]);

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.github.com/users/carolsteffen/followers")
      .then(function (serverAnswer) {
        return serverAnswer.json();
      })
      .then(function (fullAnswer) {
        setFollowers(fullAnswer);
      });

    //API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "90d2909c93f28a0a2f869f65e1adba",
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then(function (serverAnswer) {
        return serverAnswer.json();
      })
      .then(function (fullAnswer) {
        const datoCommunities = fullAnswer.data.allCommunities;

        setCommunity(datoCommunities);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser="carolsteffen" />

      <MainGrid>
        <div className="profileArea" styled={{ gridArea: "profileArea" }}>
          <Box>
            <ProfileSidebar githubUser={githubUser} />
          </Box>
        </div>

        <div className="welcomeArea" styled={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form
              onSubmit={function handleCreateCommunity(e) {
                e.preventDefault();
                const dataForm = new FormData(e.target);

                const communities = {
                  title: dataForm.get("title"),
                  imageUrl: dataForm.get("image"),
                  creatorSlug: githubUser,
                };

                fetch("/api/communities", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(communities),
                }).then(async (response) => {
                  const data = await response.json();
                  const communities = data.registryCreate;
                  const updateCommunities = [...community, communities];
                  setCommunity(updateCommunities);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelashionshipArea"
          styled={{ gridArea: "profileRelashionshipArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({friends.length})
            </h2>

            <ul>
              {friends.slice(0, 6).map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`} key={currentItem}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidade ({community.length})</h2>

            <ul>
              {community.slice(0, 6).map((currentItem) => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/community/${currentItem.id}`} key={currentItem}>
                      <img src={currentItem.imageUrl} />
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="followers" items={followers} />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((answer) => answer.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubUser,
    },
  };
}
