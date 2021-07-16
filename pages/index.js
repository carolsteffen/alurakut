
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu} from '../src/components/lib/AluraCommons';

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
              Bem-vindo
            </Box>
          </div>
          
          <div className = "profileRelashionshipArea" styled = {{gridArea: 'profileRelashionshipArea'}}>
            <Box>
              <h2 className="smallTitle">
                Pessoas da Comunidade ({comunity.length})
              </h2>

              <ul>
                {comunity.map((currentItem) => {
                  return(
                    <a href={`/users/${currentItem}`} key={currentItem}>
                      <img src={`https://github.com/${currentItem}.png`}/>
                      <span>{currentItem}</span>
                    </a>
                  )
                })}
              </ul>

            </Box>
          </div>

    </MainGrid> 
    </>
      )
 
}
