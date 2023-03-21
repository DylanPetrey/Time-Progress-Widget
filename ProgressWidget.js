// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: hourglass-half;
//Creates the widget
const getwidget = (total, haveGone, str) => {
	const titlew = w.addText(str)
	titlew.textColor = new Color("#FFFFFF")
	titlew.font = Font.boldSystemFont(13)
	w.addSpacer(6)
	const imgw = w.addImage(createProgress(total,haveGone))
	imgw.imageSize=new Size(width, h)
	w.addSpacer(6)
}

// Gets the number of days in the month
const getDays = (month, year) => {
	return new Date(year, month, 0).getDate();
}

// Calculates current progress 
const getProgress = (currentDate, start) => {
	const diffTime = currentDate.getTime() - start
	if(diffTime <= 0)	return 0;

	return elapsedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Creates the progress bars for the widget
const createProgress = (total, havegone) => {
	const ratio = havegone/total
	const context =new DrawContext()
	context.size=new Size(width, h)
	context.opaque=false
	context.respectScreenScale=true
	context.setFillColor(new Color("#48484b"))
	const path = new Path()
	path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
	context.addPath(path)
	context.fillPath()
	if(ratio <= 0.5)
		context.setFillColor(new Color("#00ff00"))
	else if (ratio <=0.9)
		context.setFillColor(new Color("#ffd60a"))
	else
		context.setFillColor(new Color("#ff0000"))
	const path1 = new Path()
	path1.addRoundedRect(new Rect(0, 0, width*havegone/total, h), 3, 2)
	context.addPath(path1)
	context.fillPath()
	return context.getImage()
}

//const width=125
const width=150 * 2
const h=5
//const h=5*2
const w = new ListWidget()
w.backgroundColor=new Color("#222222")

// Get current time
const now = new Date()
const weekday = now.getDay()
const minutes=now.getMinutes() 

// Start and end days of the semester
const start_date = new Date('1/17/2023')
const end_date = new Date('5/5/2023')

const totalTime = Math.abs(end_date - start_date)
const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24))

// Calculates the number of minutes for each progress bar
const dayProgress = now.getHours()* 60 + minutes
const weekProgress = weekday * 24 * 60 + dayProgress
const daysInMonth = getDays(now.getMonth()+1,now.getYear()) * 24 * 60
const monthProgress = (now.getDate()-1) * 24 * 60 + dayProgress

//Create progressbar
getwidget(24*60, dayProgress, "Today")
getwidget(7 * 24 * 60, weekProgress, "This week")
getwidget(daysInMonth, monthProgress, "This month")
getwidget(totalDays, getProgress(now, start_date), "This semester")


Script.setWidget(w)
Script.complete()
w.presentMedium()
