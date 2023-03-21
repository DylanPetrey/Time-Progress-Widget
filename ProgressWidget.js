// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: hourglass-half;
// Creates the widget
const getwidget = (total, progress, str) => {
	const titlew = w.addText(str)
	titlew.textColor = new Color("#FFFFFF")
	titlew.font = Font.boldSystemFont(13)
	w.addSpacer(6)
	const imgw = w.addImage(createProgress(total,progress))
	imgw.imageSize=new Size(width, h)
	w.addSpacer(6)
}

// Calculates the total amount of time since the start date
const getProgress = (currentDate, start) => {
	const diffTime = currentDate.getTime() - start
	if(diffTime <= 0)	return 0;

	return elapsedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Creates the progress bars for the widget
const createProgress = (total, progress) => {
	const ratio = progress/total
	const context =new DrawContext()
	context.size=new Size(width, h)
	context.opaque=false
	context.respectScreenScale=true
	context.setFillColor(new Color("#48484b"))
	const path = new Path()
	path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
	context.addPath(path)
	context.fillPath()
	if(ratio <= 0.4)
		context.setFillColor(new Color("#00ff00"))
	else if (ratio <=0.85)
		context.setFillColor(new Color("#ffd60a"))
	else
		context.setFillColor(new Color("#ff0000"))
	const path1 = new Path()
	path1.addRoundedRect(new Rect(0, 0, width*progress/total, h), 3, 2)
	context.addPath(path1)
	context.fillPath()
	return context.getImage()
}

// Create widget
const width=150 * 2
const h=5
const w = new ListWidget()
w.backgroundColor=new Color("#222222")

// Get current time
const now = new Date()
const weekday = now.getDay()
const minutes=now.getMinutes() 

// set bounds for the semester
const start_date = new Date('1/17/2023')
const end_date = new Date('5/5/2023')

// Calculate time in the semester
const totalTime = Math.abs(end_date - start_date)
const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24))+1

// Calculates the number of progress for each progress bar
const dayProgress = now.getHours()* 60 + minutes
const weekProgress = weekday * 24 * 60 + dayProgress
const daysInMonth = new Date(now.getYear(), now.getMonth()+1, 0).getDate()+1
const monthProgress = now.getDate() + (dayProgress / (60*24))

// Create each progress bar
getwidget(24*60, dayProgress, "Today")
getwidget(7 * 24 * 60, weekProgress, "This week")
getwidget(daysInMonth, monthProgress, "This month")
getwidget(totalDays, getProgress(now, start_date), "This semester")

// Display
Script.setWidget(w)
Script.complete()
w.presentMedium()

