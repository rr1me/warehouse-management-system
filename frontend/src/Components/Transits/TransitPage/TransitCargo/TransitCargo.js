import './TransitCargo.sass'
import BlueTable from "../../../BlueTable/BlueTable";
import TransitCargoRow from "./TransitCargoRow/TransitCargoRow";

const TransitCargo = ({current, edit}) => {
    return (
        <div className='fullRow'>
            <div className='element'>
                <div className='name'>Cargo</div>
                <div className='trCargoElem'>
                    <div className={'trCargoControls' + (edit ? ' block' : ' def')}>
                        {edit ?
                            <>
                                <button className='btn apply table'>Filter</button>
                                <button className='btn apply table'>Add new</button>
                            </>
                            : null}
                    </div>
                    <BlueTable header={cargoHeader} gridTemplate='trCargoGridTemplate' clickable={false} lightStyle={true}>
                        {current.assignedCargo ?
                            current.assignedCargo.map((value, index) => {
                                return {element: <TransitCargoRow current={value}/> , id: index};
                            })
                            :null}
                    </BlueTable>
                </div>
            </div>
        </div>
    )
};

export default TransitCargo;

const cargoHeader = [
    'Id',
    'Sticker id',
    'Inner works',
    'Description'
];