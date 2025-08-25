declare module "mic-recorder-to-mp3" {
    export interface MicRecorderOptions {
        bitRate?: number;
    }

    class MicRecorder {
        constructor(options?: MicRecorderOptions);
        start(): Promise<void>;
        stop(): { getMp3(): Promise<[ArrayBuffer, Blob]> };
    }

    export = MicRecorder;
}
