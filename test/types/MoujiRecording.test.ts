import {
  deserializeRecording,
  serializeRecording,
} from "../../src/types/MoujiRecording";

describe("MoujiRecording", () => {
  describe("serializeRecording", () => {
    it("should serialize a recording", () => {
      const recording = {
        data: [
          { x: 1, y: 2 },
          { x: 3, y: 4 },
        ],
        meta: {
          interval: 10,
        },
      };
      const serialized = serializeRecording(recording);
      expect(serialized).toEqual(
        '{"meta":{"interval":10},"points":[[1,2],[3,4]]}'
      );
    });
  });

  describe("deserializeRecording", () => {
    it("should deserialize a recording", () => {
      const recording = {
        data: [
          { x: 1, y: 2 },
          { x: 3, y: 4 },
        ],
        meta: {
          interval: 10,
        },
      };
      const serialized = serializeRecording(recording);
      const deserialized = deserializeRecording(serialized);
      expect(deserialized).toEqual(recording);
    });

    it("should throw an error if the recording is invalid", () => {
      const serialized =
        '{"meta":{"interval":10,"version":1},"points":[[1,2],[3,4]]';
      expect(() => deserializeRecording(serialized)).toThrow();
    });
  });
});
