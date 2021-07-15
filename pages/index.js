
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

function ProfileSidebar(){
  return(
    <Box>
    <img src = {`https://github.com/${githubUser}.png`}/>
  </Box>
  )
}


export default function Home() {

  const githubUser = 'carolsteffen';

  return ( <MainGrid>

    <div className = "profileArea" styled = {{gridArea: 'profileArea'}}>
      <Box>
        <ProfileSidebar/>
      </Box>
    </div>
    
    <div className = "welcomeArea" styled = {{gridArea: 'welcomeArea'}}>
      <Box>
        Bem-vindo
      </Box>
    </div>
    
    <div className = "profileRelashionshipArea" styled = {{gridArea: 'profileRelashionshipArea'}}>
      <Box>
        Comunidades
      </Box>
    </div>


  </MainGrid> 

    )

}
