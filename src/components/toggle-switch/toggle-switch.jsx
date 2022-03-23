import './toggle-switch.css';

function ToggleSwitch(props) {
  const style = props.className ? props.className : '';

  return (
      <div className={`toggle-switch ${style}`}>
        <span className='toggle-switch__line' />
        <label className="toggle-switch__label">
          <input className="toggle-switch__checkbox" type="checkbox" name="switch" value="switch"
                 onChange={props.onChange} checked={props.values.switch} />
          <div className="toggle-switch__toggle">
            <div className="toggle-switch__indicator" />
          </div>
          <div className="toggle-switch__label-text">Короткометражки</div>
        </label>
        <span className='toggle-switch__line' />
      </div>
  )
}

export default ToggleSwitch;