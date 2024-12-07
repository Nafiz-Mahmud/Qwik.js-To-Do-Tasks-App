import { $, component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { DocumentHead, useLocation, useNavigate } from "@builder.io/qwik-city";


export default component$(() => {
    const location = useLocation();
    const { id } = location.params;
    const localStorageTasks = useSignal([]);
    const navigate = useNavigate();
    useVisibleTask$(() => {
        localStorageTasks.value = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    })
    const singleTask = localStorageTasks.value.find((task) => task.id == id) || {};
    const deleteTask = $((id) => {
        // delete single item from local storage
        localStorage.setItem("tasks", JSON.stringify(localStorageTasks.value.filter((task) => task.id !== id)))
        navigate("/");
    })
    return (
        <div class="w-[90%] m-auto">

            <div

                class="task shadow-xl  bg-gray-100  w-full  p-[1rem] rounded-xl"
            >

                <h2
                    class={`text-2xl font-bold ${singleTask.done ? "line-through text-gray-600" : ""
                        }`}
                > {singleTask.title}
                </h2>
                <p class="text-gray-600">1 hour ago</p>
                <p class="text-gray-600 py-[.5rem]">
                    {singleTask.description}
                </p>
                <p
                    style={{
                        backgroundColor:
                            singleTask.label === "Urgent"
                                ? "coral"
                                : singleTask.label === "General"
                                    ? "lightgreen"
                                    : "yellow",
                        padding: ".25rem .5rem",
                        width: "fit-content",
                        borderRadius: ".5rem",
                        fontWeight: "bold",
                    }}
                >
                    {singleTask.label}
                </p>

                <button class="mt-[3rem] px-[1rem] py-[0.5rem] bg-red-400 hover:bg-red-500 font-bold rounded" onClick$={() => deleteTask(singleTask.id)} >Delete This Task</button>
            </div>
        </div>
    );
});


