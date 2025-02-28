import { formatDistance, subDays } from "date-fns";
import './styles.css';
import { ProjectDisplayFunc } from './modules/displayProject';
import { toDoDisplayFunc } from './modules/displayTodos';

console.log("helloWorld!")

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
ProjectDisplayFunc();
toDoDisplayFunc(0);

