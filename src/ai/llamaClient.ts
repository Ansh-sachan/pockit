import { initLlama, LlamaContext } from "llama.rn";

export type LlamaMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

let context: LlamaContext | null = null;
let loadingPromise: Promise<LlamaContext> | null = null;

function normalizeModelPath(modelPath: string): string {
    return modelPath;
}

export function isModelLoaded(): boolean {
    return context !== null;
}

export async function loadModel(modelPath: string): Promise<LlamaContext> {
    if (context) {
        return context;
    }

    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = initLlama({
        model: normalizeModelPath(modelPath),
        n_ctx: 2048,
        n_gpu_layers: 0,
    })
        .then((loadedContext) => {
            context = loadedContext;
            return loadedContext;
        })
        .finally(() => {
            loadingPromise = null;
        });

    return loadingPromise;
}

export async function sendMessage(
    UserMessages: LlamaMessage[],
): Promise<string> {
    if (!context) {
        throw new Error("Model is not loaded yet.");
    }

    const result = await context.completion({
        messages: [{
            role: 'system',
            content: 'This is a conversation between user and assistant, a friendly chatbot. and your name was "Pockit'
        },
        ...UserMessages
        ],
        n_predict: 200,
        temperature: 0.7,
        stop: ["</s>", "<|eot_id|>", "<|end_of_text|>"],
    });

    return result.text.trim();
}