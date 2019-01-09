import React from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler';
import withDragDropContext from '../withDnDContext';
import { connect } from "react-redux";
import 'react-big-scheduler/lib/css/style.css';

//console.log(store.dispatch( useData({ resources: DemoData.resources, events: DemoData.events }) ));

const mapStateToProps = state => {
    return { viewModel: state.schedulerData }
};

const ConnectedScheduler = ({viewModel}) => (
    <div>
        <Scheduler
            schedulerData={viewModel}
        />
    </div>
)

const MyScheduler = connect(mapStateToProps)(ConnectedScheduler)

export default withDragDropContext(MyScheduler)
