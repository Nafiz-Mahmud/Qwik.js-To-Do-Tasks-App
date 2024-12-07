import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";


export default component$(() => {
  const localStorageTasks = useSignal([]);
  const openAddTaskModal = useSignal(false);
  const taskTitle = useSignal("");
  const taskDescription = useSignal("");
  const taskLabel = useSignal("General");
  useVisibleTask$(() => {
    localStorageTasks.value = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") as string) || [] : [];
  })
  const tasks = [
    {
      id: 1, title: "Buy Milk", description: "Buy milk from the store when coming back home.", label: "Urgent", done: false
    }, {
      id: 2, title: "Buy Carrot", description: "Buy Carrot from the store when coming back home.", label: "General", done: true
    }, {
      id: 3, title: "Buy Banana", description: "Buy banana from the store when coming back home.", label: "Optional", done: false
    }, {
      id: 4, title: "Buy Bread", description: "Buy bread from the store when coming back home.", label: "Urgent", done: true
    }, {
      id: 5, title: "Buy Cookie", description: "Buy cookie from the store when coming back home.", label: "General", done: false
    }
  ]
  const addTask = $(() => {
    const newTask = {
      id: localStorageTasks.value.length + 1,
      title: taskTitle.value,
      description: taskDescription.value,
      label: taskLabel.value,
      done: false
    }
    try {

      // set local storage
      localStorage.setItem("tasks", JSON.stringify([...localStorageTasks.value, newTask]))
      console.log(newTask)
      openAddTaskModal.value = !openAddTaskModal.value;
    } catch (error) {
      console.log(error)
    }

  })
  return (
    <div class="homepage w-[90%] m-auto">
      {
        openAddTaskModal.value && (
          <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="modal w-[50%] bg-white p-[2rem] rounded-xl">
              <h2 class="text-2xl font-bold text-center">Add A Task</h2>
              <form onSubmit$={addTask} class="mt-[1rem] flex flex-col gap-[.5rem]">
                {/* <form preventdefault:submit onSubmit$={addTask} class="mt-[1rem] flex flex-col gap-[.5rem]"> */}
                <label for="task_title" class="font-bold " >Task Title</label>
                <input class="p-2 bg-gray-200 outline-none font-bold focus:bg-blue-100" id="task_title" type="text" placeholder="Write Task title" onChange$={(event: any) => taskTitle.value = event.target.value} />
                <label for="task_description" class="font-bold mt-[.5rem]">Task Description</label>
                <textarea name="" id="task_description" class="p-2 bg-gray-200 outline-none font-bold focus:bg-blue-100" placeholder="Write Task description" onChange$={(event: any) => taskDescription.value = event.target.value} ></textarea>
                <label for="task_label" class="font-bold mt-[.5rem]">Task Label</label>
                <select class="p-2 bg-gray-200  outline-none font-bold focus:bg-blue-100" id="task_label" onChange$={(event: any) => taskLabel.value = event.target.value} >
                  <option value="General" >General</option>
                  <option value="Urgent" >Urgent</option>
                  <option value="Optional">Optional</option>
                </select>
                <div class="buttons flex justify-between mt-[1rem]">
                  <button class="px-[1rem] py-[.5rem] bg-red-400 hover:bg-red-500 font-bold rounded" onClick$={() => openAddTaskModal.value = !openAddTaskModal.value} >Cancel</button>
                  <button type="submit" class="px-[1rem] py-[.5rem] bg-green-400 hover:bg-green-500 font-bold rounded" >Add Task</button>
                </div>
              </form>
            </div>
          </div>
        )

      }
      <div class="home_title mt-[1rem] flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-600">All Tasks ( {localStorageTasks.value.length < 10 ? `0${localStorageTasks.value.length}` : localStorageTasks.value.length} )</h1>
        <button class="add_task px-[1rem] py-[.5rem] bg-green-400 hover:bg-green-500 font-bold rounded"
          onClick$={() => openAddTaskModal.value = !openAddTaskModal.value} >Add Task</button>
      </div>
      <div class="tasks mt-[2rem] flex flex-wrap gap-4">
        {localStorageTasks.value.map((task: any, index) => (
          <div
            key={task.id}
            class="task shadow-xl  bg-blue-100  w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] hover:transform hover:scale-105 hover:cursor-pointer duration-300 p-[1rem] rounded-xl"
          >

            <Link href={`/tasks/${task.id}`} >

              <h2
                class={`text-2xl font-bold ${task.done ? "line-through text-gray-600" : ""
                  }`}
              >
                {index + 1}. {task.title}
              </h2>   <p class="text-gray-600">1 hour ago</p> <p
                style={{
                  backgroundColor:
                    task.label === "Urgent"
                      ? "coral"
                      : task.label === "General"
                        ? "lightgreen"
                        : "yellow",
                  padding: ".25rem .5rem",
                  width: "fit-content",
                  borderRadius: ".5rem",
                  fontWeight: "bold",
                  marginTop: ".5rem"
                }}

              >
                {task.label}
              </p>

              <p class="text-gray-600 py-[.5rem]">
                {task.description.slice(0, 30)}...
              </p>
            </Link>
          </div>
        ))}
      </div>

      {localStorageTasks.value.length == 0 &&
        <p class="text-4xl font-bold text-gray-600 text-center">No Task Found!</p>
      }
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik Tasks",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
