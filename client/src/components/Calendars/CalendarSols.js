import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
	CALENDAR_MAX_TIME,
	CALENDAR_MIN_TIME,
} from '../../../utils/constantUtils';

import { Button, Stack, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { postReminder } from '../../../services/slices/dataSlice';
import MyButton from '../../../components/MyButton';
import * as CT from '../../../utils/constantUtils';
import { activityInitialState } from '../../../utils/initialState';

import ActivityForm from '../../Files/Details/Activities/ActivityForm';
import { addCalendarEvents } from '../../../services/slices/calendarSlice';
import * as FT from '../../../services/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import MyDialog from '../../../components/MyDialog';
import { useAppDispatch } from '../../../services/hooks';
import { updateDate } from '../../../services/slices/calendarSlice';
import MySnackbar from '../../../components/MySnackbar';

export default function CalendarEvent({
	localizer,
	date,
	setDate,
	events,
	setEvents,
	selectValue,
	resources,
	getEvents,
	reminders,
	getReminders,
}: CalendarEventProps) {
	const dispatch = useAppDispatch();

	const userData = JSON.parse(
		localStorage.getItem('accountData') || '{}'
	) as FT.AccountResponseData;

	const today = new Date();
	const [selectedEvent, setSelectedEvent] = useState<any>();
	const [formattedEventsData, setformattedEventsData] = useState<any[]>([]);
	const [formattedRemindersData, setformattedRemindersData] = useState<any[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isResourcesLoading, setIsResourcesLoading] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const defaultUser: User = {
		value: userData.email,
		label: 'You',
	};
	const [selectedUsers, setSelectedUsers] = useState(
		userData.email ? [defaultUser] : []
	);
	const calRef = useRef<any>(null);

	const bigCalFormats = {
		monthHeaderFormat: 'MMMM y',
		dayFormat: 'eeee, MMMM d',
		timeGutterFormat: 'h:mm',
	};

	const postReminderMethod = (actionValue: string, reminder: any) => {
		let doneValue = false;

		if (actionValue === 'Done') {
			doneValue = true;
		}
		dispatch(
			postReminder({
				fileId: reminder.fileId,
				data: {
					id: reminder.id,
					changeType: 'SAVE',
					done: doneValue,
					reminderText: reminder.reminderText,
					reminderDate: reminder.reminderDate,
					reminderTime: reminder.reminderTime,
					reminderForUserList: [reminder.reminderForUserId],
				},
			})
		)
			.then((response: any) => {
				getReminders(resources.map((x: any) => x.id));
				setOpenDialog(false);
			})
			.catch((error: any) => {});
	};

	const handleSelectEvent = (event: any) => {
		setSelectedEvent(event);
		setOpenDialog(true);
	};

	const handleSmallCalNavigate = (day: Date) => {
		setDate(day);
	};

	const handleBigCalNavigate = (day: Date) => {
		setDate(day);
		getEvents(
			resources.map((x: { id: string }) => x.id),
			moment(day).format('YYYY-MM-DD'),
			resources.length > 1 ? 'day' : 'week'
		);
	};

	const scrollToDay = () => {
		if (selectedUsers && selectedUsers.length <= 1) {
			let day = date.getDay();
			if (day === 0) {
				day = 1;
			} else if (day === 6) {
				day = 5;
			}
			day--;
			document
				.querySelector('.rbc-time-header-cell')
				?.children[day]?.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				});
		}
	};

	useEffect(() => {
		scrollToDay();
	}, [date]);

	useEffect(() => {
		setformattedEventsData(
			events.map((x: any) => ({
				id: x.id,
				title: x.subject,
				start: moment(x.start.dateTime).toDate(),
				end: moment(x.end.dateTime).toDate(),
				type: 'other',
				sensitivity: x.sensitivity,
				allday: false,
				resourceId: x.email,
			}))
		);
	}, [events]);

	useEffect(() => {
		setformattedRemindersData(
			reminders
				.filter((z: any) => z.done != true)
				.map((x: any) => ({
					...x,
					title: x.reminderText,
					start: moment(
						`${x.reminderDate} ${x.reminderTime}`,
						'YYYY-MM-DD HH:mm'
					).toDate(),

					time: x.reminderTime,
					type: 'other',
					allday: false,
					reminder: true,
					resourceId: x.reminderFor,
				}))
		);
	}, [reminders]);
	return (
		<div className='App'>
			{resources && resources.length > 1 && (
				<Calendar
					ref={calRef}
					className={
						isLoading || isResourcesLoading
							? 'events-calendar__big events-calendar__big--loading'
							: 'events-calendar__big'
					}
					localizer={localizer}
					events={[...formattedEventsData, ...formattedRemindersData]}
					views={[Views.DAY]}
					defaultView={Views.DAY}
					drilldownView={Views.DAY}
					date={date}
					formats={bigCalFormats}
					resources={resources}
					resourceIdAccessor='id'
					resourceTitleAccessor='title'
					step={15}
					timeslots={4}
					min={
						new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							CALENDAR_MIN_TIME
						)
					}
					max={
						new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							CALENDAR_MAX_TIME
						)
					}
					startAccessor='start'
					endAccessor='end'
					selectable={false}
					style={{
						height: '240vh',
						minWidth: resources && resources?.length > 3 ? 1200 : 0,
					}}
					components={{
						toolbar: (props) => (
							<BigCalToolbar
								{...props}
								selectedUser={selectedUsers[0]}
								date={date}
								resources={resources}
								userData={userData}
								getEvents={getEvents}
							/>
						),
						event: CustomEvent,
					}}
					onNavigate={handleBigCalNavigate}
					onSelectEvent={handleSelectEvent}
				/>
			)}
			{resources && resources.length <= 1 && (
				<Calendar
					ref={calRef}
					className={
						isLoading || isResourcesLoading
							? 'events-calendar__big events-calendar__big--loading'
							: 'events-calendar__big'
					}
					localizer={localizer}
					events={[...formattedEventsData, ...formattedRemindersData]}
					views={[Views.WORK_WEEK]}
					defaultView={Views.WORK_WEEK}
					drilldownView={Views.WORK_WEEK}
					date={date}
					formats={bigCalFormats}
					step={15}
					timeslots={4}
					min={
						new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							CALENDAR_MIN_TIME
						)
					}
					max={
						new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							CALENDAR_MAX_TIME
						)
					}
					startAccessor='start'
					endAccessor='end'
					selectable={false}
					style={{ height: 1600 }}
					components={{
						toolbar: (props) => (
							<BigCalToolbar
								{...props}
								selectedUser={selectedUsers[0]}
								date={date}
								resources={resources}
								getEvents={getEvents}
								userData={userData}
							/>
						),
						event: CustomEvent,
					}}
					onNavigate={handleBigCalNavigate}
					onSelectEvent={handleSelectEvent}
				/>
			)}
			<MyDialog
				maxWidth='sm'
				title={selectedEvent?.title}
				content={
					<>
						<p>
							<b>Start time</b>: {selectedEvent?.start.toLocaleString()}
						</p>
						{!selectedEvent?.reminder ? (
							<p>
								<b>End time</b>: {selectedEvent?.end.toLocaleString()}
							</p>
						) : (
							<p>
								<b>Reminder time</b>: {selectedEvent?.time}
							</p>
						)}
						{selectedEvent?.reminder && (
							<MyButton
								variant='text'
								text='Mark as Done'
								handleClick={() => postReminderMethod('Done', selectedEvent)}
							/>
						)}
					</>
				}
				open={openDialog}
				setOpen={setOpenDialog}
			/>
		</div>
	);
}

interface BigCalToolbarProps {
	onNavigate: (action: 'PREV' | 'NEXT') => void;
	label: string;
	selectedUser: any;
	date: any;
	resources?: any;
	getEvents?: any;
	userData: FT.AccountResponseData;
	view: string;
}

function BigCalToolbar({
	onNavigate,
	label,
	selectedUser,
	date,
	resources,
	getEvents,
	userData,
	view,
}: BigCalToolbarProps) {
	const [openActivity, setOpenActivity] = useState(false);
	const [activity, setActivity] = useState<FT.FileActivityData>(
		activityInitialState as FT.FileActivityData
	);
	const [severity, setSeverity] = useState<string>('');
	const [openSnackbar, setOpenSnackbar] = useState<boolean>();
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(updateDate(moment(date).format('YYYY-MM-DD')));
	}, []);

	const saveActivity = (actionFor: string, updatedActivity: FT.EventData) => {
		setLoading(true);
		let email: string = userData?.email;
		let activityPayload = {
			subject: updatedActivity?.eventType,

			body: {
				content: updatedActivity?.fileActivityNoteList[0]?.activityNote,
				contentType: 'text',
			},

			startDateTime: moment(
				`${updatedActivity.activityDate} ${updatedActivity.fromTime}`
			).format('YYYY-MM-DD HH:mm:ss'),

			endDateTime: moment(
				`${updatedActivity.activityDate} ${updatedActivity.toTime}`
			).format('YYYY-MM-DD HH:mm:ss'),

			locationName: updatedActivity?.location,
			attendees: updatedActivity?.attendeesList?.map((x: any) => ({
				emailAddress: {
					address: x.emailAddress,
				},
			})),
		};
		dispatch(
			addCalendarEvents({
				emailAddress: email,
				data: activityPayload,
			})
		)
			.then((response: any) => {
				if (response?.error) {
					showSnackbar('error', response?.error?.message);
					return;
				}
				setOpenActivity(false);
				setLoading(false);
				setActivity(activityInitialState as FT.FileActivityData);
				getEvents(
					[email],
					moment(new Date()).format('YYYY-MM-DD'),
					'week_view'
				);
			})
			.catch((error: any) => {
				setLoading(false);
				showSnackbar('error', CT.commonErrorMsg);
			});
	};

	const showSnackbar = (sev: string, msg: string) => {
		setSeverity(sev);
		setOpenSnackbar(true);
		setSnackbarMsg(msg);
	};
	const handlePrevButton = () => {
		onNavigate('PREV');
		dispatch(updateDate(moment(date).format('YYYY-MM-DD')));
	};
	const handleNextButton = () => {
		onNavigate('NEXT');
		dispatch(updateDate(moment(date).format('YYYY-MM-DD')));
	};
	return (
		<>
			<Stack direction={'row'} justifyContent={'space-between'} mb={2}>
				<Stack direction={'row'} spacing={4}>
					<Button variant='text' onClick={() => handlePrevButton()}>
						<ChevronLeft fontSize='large' />
					</Button>
					<Typography fontWeight={'bold'} sx={{ lineHeight: '2.5' }}>
						{label}
					</Typography>
					<Button variant='text' onClick={() => handleNextButton()}>
						<ChevronRight fontSize='large' />
					</Button>
				</Stack>
				<Stack direction={'row'} spacing={2}>
					{resources?.length <= 1 && (
						<MyButton
							text={CT.addActivityBtn}
							color='primary'
							startIcon={<CalendarTodayIcon />}
							handleClick={() => {
								setOpenActivity(true);
								setActivity(activityInitialState as FT.FileActivityData);
							}}
						/>
					)}
				</Stack>
			</Stack>
			<ActivityForm
				activity={activity}
				setActivity={setActivity}
				showSnackbar={showSnackbar}
				openActivity={openActivity}
				setOpenActivity={setOpenActivity}
				loading={loading}
				saveActivity={(updatedActivity: any) =>
					saveActivity('activity', updatedActivity)
				}
			/>
			<MySnackbar
				severity={severity}
				open={openSnackbar}
				setOpen={setOpenSnackbar}
				message={snackbarMsg}
				duration={3000}
			/>
		</>
	);
}

interface CustomEventProps {
	event: {
		id?: string;
		type: string;
		sensitivity?: string;
		title: string;
		allDay: boolean;
		start: Date;
		end: Date;
	};
}

function CustomEvent(props: any) {
	return (
		<>
			<div className='rbc-event-content-title'>
				{props.event.type == 'reminder' && (
					<FontAwesomeIcon size='lg' icon={faBell} />
				)}
				<Typography variant='caption'>
					<strong>
						{props.event.sensitivity && props.event.sensitivity == 'normal'
							? props.event.type
									.replace('-', ' ')
									.replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
										letter.toUpperCase()
									)
							: 'Private'}
					</strong>{' '}
					{props.event.sensitivity && props.event.sensitivity == 'normal'
						? props.event.title
						: ''}
				</Typography>
				{props.event.sensitivity &&
					props.event.sensitivity == 'normal' &&
					!props.event.allDay &&
					props.event.type != 'reminder' && (
						<>
							<br />
							<Typography variant='caption'>
								{format(props.event.start, 'h:mm aaa') +
									' - ' +
									format(props.event.end, 'h:mm aaa')}
							</Typography>
						</>
					)}
			</div>
		</>
	);
}
