import { Framework } from "./framework.js";
import { lessons } from "./lessons.js";


const f = new Framework('#app')

// f.handle({lessons: lessons.map(prepLessonObj)})

const myLessons = f.handlePreprocessed({lessons}, prepLessonObj)

setTimeout(
  () => myLessons[0].topic = 'CHANGED TOPIC',
  3000
)


window.lessons = myLessons


document.querySelector('#lesson-list').onclick = e => {
  if (e.target.classList.contains('topic')) {
    e.target.set
  }
}


function prepLessonObj(lesson) {
  const {id, start, end, title, topic} = lesson
  const startDate = new Date(start)
  const endDate = new Date(end)

  const date = startDate.toLocaleDateString('en', {weekday: 'long', day: 'numeric', month: 'long'})
  const time = startDate.toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' - ' + endDate.toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit' })

  return {id, date, time, title, topic}
}

// renderLessons(lessons)

function renderLessons(lessons) {
  const list = document.querySelector('#lesson-list')
  const items = lessons.map(lesson => buildLessonItem(prepLessonObj(lesson)))
  list.replaceChildren(...items)
}

function buildLessonItem(lesson) {
  const li = document.createElement('li')
  const divs = ['date', 'time', 'title', 'topic'].map(prop => {
    const div = document.createElement('div')
    div.classList.add(prop)
    div.append(lesson[prop])
    return div
  })

  li.append(...divs)
  return li
}
