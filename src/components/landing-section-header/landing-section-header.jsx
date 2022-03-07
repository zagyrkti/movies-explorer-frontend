import './landing-section-header.css'

function LandingSectionHeader(props) {

  const style = props.className ? props.className : '';
  return (
      <h2 className={`landing-section-header ${style}`}>{props.children}</h2>
  )
}

export default LandingSectionHeader;