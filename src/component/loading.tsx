import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '100%' }}>
        <BeatLoader size={30} color='#30336b' />
    </div>
  )
}

export default Loading