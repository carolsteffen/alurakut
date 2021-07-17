
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(property){
  return(
    <Box>
    <img src = {`https://github.com/${property.githubUser}.png`}/>
  </Box>
  )
}


export default function Home() {

  const githubUser = 'carolsteffen';
  const comunity = [
  'guilhermegules', 
  'maykbrito', 
  'Franciellycs', 
  'carooxs', 
  'juunegreiros', 
  'Bullas']

    return (
      <>
      <AlurakutMenu/>

        <MainGrid>
          <div className="profileArea" styled={{gridArea: 'profileArea'}}>
            <Box>
              <ProfileSidebar githubUser={githubUser}/>
            </Box>
          </div>
          
          <div className = "welcomeArea" styled = {{gridArea: 'welcomeArea'}}>
            <Box>
              <h1 className='title'>Bem-vindo</h1>

              <OrkutNostalgicIconSet/>
            </Box>
          </div>
          
          <div className = "profileRelashionshipArea" styled = {{gridArea: 'profileRelashionshipArea'}}>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da Comunidade ({comunity.length})
              </h2>

              <ul>
              {comunity.map((currentItem) => {
                  return(
                <li>
                    <a href={`/users/${currentItem}`} key={currentItem}>
                      <img src={`https://github.com/${currentItem}.png`}/>
                      <span>{currentItem}</span>
                    </a>
                </li>

              )
              })}
                    </ul>

            </ProfileRelationsBoxWrapper>
          </div>

    </MainGrid> 
    </>
      )
 
}
