import {app} from "./app";
import {logger} from "./utils/logger";
import dayjs from 'dayjs'
import rT from 'dayjs/plugin/relativeTime'
import _ from 'lodash'
import join from "./utils/join";
const port = process.env.PORT || 5000

app.listen(port,()=>{
     logger.log(`server is running on port ${port}`)
})


const y = dayjs(Date.now())
const relativeTime = y.format('MMMM D')
const b = y.format('MMM D, YYYY')
console.log(b)
console.log(relativeTime)

dayjs.extend(rT)
const z = dayjs('2023-03-13 21:49:56')
const r = z.fromNow()
const d = z.toNow()
const n = z.from(Date.now())
console.log(r)
console.log(d)
console.log(n)
