/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChartPie, ChevronDown, ChevronUp, PictureInPicture2, School2, Search, Users, VideoIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PiPWindow from "@/context/pip-window";
import { io } from "socket.io-client";
// import {
//   getMeetingBymeetingCode,
//   getMeetingParticipants,
//   startRecognition,
// } from "@/lib/api/meeting";
// import { getRecognition } from "@/lib/api/recognition";
// import { MeetingsType } from "@/lib/api/types";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { usePiPWindow } from "@/context/pip-provider";
import DoughnutChart from "@/components/charts/doughnut-chart";
import { Switch } from "@/components/ui/switch";
import { RecognitionData, useSelectRecognitionModel, useStartRecognition, useStopRecognition } from "@/hooks/api/recognition-service-hooks";
import { MeetingData, useGetMeetingByMeetingCode } from "@/hooks/api/meeting-service-hooks";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BaseResponse } from "@/constants/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatName } from "@/lib/utils";

interface MeetingActionsProps {
  recognitionsData: BaseResponse<RecognitionData>;
  meetingData: BaseResponse<MeetingData>;
  errorState: any;
  meetingCode: string;
  isEnded: boolean | undefined;
}

export default function MeetingActions({
  recognitionsData,
  meetingCode,
  isEnded
}: MeetingActionsProps) {
  const startRecognition = useStartRecognition();
  const stopRecognition = useStopRecognition();
  const {
    data: meetingData,
  } = useGetMeetingByMeetingCode(meetingCode);

  const [showParticipants, setShowParticipants] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredParticipants = useMemo(() => {
    return meetingData?.data.participants.filter(participant =>
      participant.user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [meetingData?.data.participants, searchQuery])
  // const [selectedModel, setSelectedModel] = useState("default");


  // const [, setMeetingData] = useState();

  // const [, setMeetingParticipants] = useState([]);
  // const [, setRecognitionsDetail] = useState();
  // const [, setRecognitionsOverview] = useState();
  // const [, setRecognitionsSummary] = useState();

  const {
    // isSupported,
    requestPipWindow,
    pipWindow,
  } = usePiPWindow();
  const pipWindowWidth = 200;
  const pipWindowHeight = 200;

  const handlePiP = useCallback(async () => {
    requestPipWindow(pipWindowWidth, pipWindowHeight);
  }, [requestPipWindow]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  // const baseURL = 'http://localhost:8080';

  const socket = io(baseURL as string, {
    transports: ["websocket"],
    upgrade: false,
  });

  // const isRecognitionSwitchedOn =
  //   localStorage.getItem("startRecognition") === "true" ? true : false;
  // const isRecognitionSwitchedOn = meetingData?.data.isRecognitionStarted
  // const selectedRecognitionModel = meetingData?.data.selectedRecognitionModel;
  const selectRecognitionModel = useSelectRecognitionModel();



  // const [isStartRecognition, setIsStartRecognition] = useState(
  //   isRecognitionSwitchedOn
  // );

  const [selectedModel, setSelectedModel] = useState(meetingData?.data.selectedRecognitionModel || 'NONE');
  const [isRecognitionSwitchedOn, setIsRecognitionSwitchedOn] = useState(meetingData?.data.isRecognitionStarted);

  useEffect(() => {
    if (selectedModel === 'NONE') {
      setIsRecognitionSwitchedOn(false);
    }


  }, [selectedModel]);
  enum RecognitionModelEnum {
    NONE = 0,
    FACE_API = 1,
    EMOVALARO = 2,
  }

  const handleSelectModel = (value: any) => {
    setSelectedModel(value);
    let recognitionModel: RecognitionModelEnum;
    switch (value) {
      case 'EMOVALARO':
        recognitionModel = RecognitionModelEnum.EMOVALARO;
        break;
      case 'FACE_API':
        recognitionModel = RecognitionModelEnum.FACE_API;
        break;
      default:
        recognitionModel = RecognitionModelEnum.NONE;
    }


    selectRecognitionModel.mutate({ meetingCode: meetingData?.data.meetingCode as string, RecognitionModel: recognitionModel }, {
      onSuccess: () => {
        toast.success("Recognition model selected");
      },
      onError: () => {
        toast.error("Failed to select recognition model");
      }
    });
  };



  const recognitionPieComponent = <DoughnutChart data={recognitionsData.data.recognitionsSummary} width={pipWindowWidth} height={pipWindowHeight} />;
  // const recognitionComponent = <RadarChart data={recognitionsData.data.recognitionsOverview} />;

  const handleToggleRecognition = async (checked: boolean) => {
    // Optimistically update the state
    setIsRecognitionSwitchedOn(checked);

    if (selectedModel === 'NONE') {
      toast.error("Please select a model");
      return;
    }

    if (checked) {
      await startRecognition.mutateAsync(meetingData?.data.meetingCode as string, {
        onSuccess: () => {
          toast.success("Recognition started");
        },
        onError: () => {
          toast.error("Failed to start recognition");
          // Revert the state change if the mutation fails
          setIsRecognitionSwitchedOn(false);
        }
      });
    } else {
      await stopRecognition.mutate(meetingData?.data.meetingCode as string, {
        onSuccess: () => {
          toast.success("Recognition stopped");
        },
        onError: () => {
          toast.error("Failed to stop recognition");
          // Revert the state change if the mutation fails
          setIsRecognitionSwitchedOn(true);
        }
      });
    }
  };

  const handleOnMount = async () => {
    try {
      // const data: MeetingsType | any = await getMeetingBymeetingCode({
      //   meetingCode,
      // });
      // setMeetingData(data ?? data[0]);
      // const refetchMeetingData = await refetchMeeting();
      // const data = refetchMeetingData.data?.data;
      // if (data) setMeetingData(data);
      // fetchRecognitionOverview(meetingCode, " ");
      // fetchMeetingParticipants(meetingCode);

      socket.on("connect", () => {
        socket.emit("join", meetingCode);
      });

      socket.on("USER_JOINED", () => {
        // fetchMeetingParticipants(meetingCode);
      });

      socket.on("RECOGNITION_DATA_ADDED", () => {
        // fetchRecognitionOverview(meetingCode, " ");
        // console.log("FER:: Recognition Running");
      });
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    handleOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="flex items-center">
        {!isEnded ? (
          <Card className="w-full  bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Model Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Recognition Model
                  </label>
                  <Select value={selectedModel} onValueChange={handleSelectModel}>
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">
                        ===== Select Model =====
                      </SelectItem>
                      <SelectItem value="FACE_API">face-api.js by Vincent Mühler</SelectItem>
                      <SelectItem value="EMOVALARO">EmoValaro7 by Rangga Kalam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="dark:bg-neutral-800" />

                {/* Recognition Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Recognition Status
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Off</span>
                    <Switch
                      checked={selectedModel === 'default' ? false : isRecognitionSwitchedOn}
                      disabled={selectedModel === 'default'}
                      onCheckedChange={handleToggleRecognition}
                      className="data-[state=checked]:bg-sky-600 dark:data-[state=checked]:bg-sky-700"
                    />
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">On</span>
                  </div>
                </div>

                <Separator className="dark:bg-neutral-800" />
                <div className="flex items-center justify-between">
                  {isRecognitionSwitchedOn ? (


                    <Badge
                      variant="outline"
                      className="bg-red-600 text-white border-none animate-pulse p-2 px-3 flex items-center gap-2"
                    >
                      <VideoIcon className="w-5" />
                      <p className="text-xs">

                        Recognition Running
                      </p>
                    </Badge>

                  ) : (
                    <Badge
                      variant="outline"
                      // className="bg-red-600 text-white border-none animate-pulse p-2 px-3 flex items-center gap-2"
                      className="bg-gray-500 text-white border-none p-2 px-3 flex items-center gap-2"
                    >
                      <VideoIcon className="w-5" />
                      <p className="text-xs">

                        Recognition Stopped
                      </p>
                    </Badge>

                  )}
                  {/* Floating Window Button */}
                  <ActionTooltip label="Show Picture in Picture display for realtime emotion recognition" duration={500}>

                    <div className="flex justify-end">
                      <Button
                        onClick={handlePiP}
                        disabled={!isRecognitionSwitchedOn}
                        className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-700 dark:hover:bg-sky-800"
                      >
                        <PictureInPicture2 className="w-4 h-4 mr-2" />
                        Floating Window
                      </Button>
                    </div>
                  </ActionTooltip>
                </div>

              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            <Button
              className="bg-sky-700
            dark:bg-sky-800 text-white dark:text-white
          "
              disabled
            >
              Meeting Ended
            </Button>

          </div>
        )}
      </div>

      {pipWindow && (
        <PiPWindow pipWindow={pipWindow}>
          <div className="pipRoot max-w-sm h-auto bg-white dark:bg-neutral-900 shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                Picture-in-Picture
              </h1>
            </div>
            <div className="p-4">
              <div className="flex">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Recognition Status</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">:</span>
                    {/* <span className="text-green-600 dark:text-green-400">
                    </span> */}
                    {isRecognitionSwitchedOn ? <Badge
                      variant="outline"
                      className="bg-green-600 text-white border-none animate-pulse p-2 px-3 flex items-center gap-2"
                    >
                      <VideoIcon className="w-5" />
                      <p className="text-xs">

                        Running
                      </p>
                    </Badge> : (
                      <Badge
                        variant="outline"
                        className="bg-gray-500 text-white border-none p-2 px-3 flex items-center gap-2"
                      >
                        <VideoIcon className="w-5" />
                        <p className="text-xs">

                          Stopped
                        </p>
                      </Badge>
                    )}


                  </div>
                </div>

              </div>
              <div className="flex gap-2 justify-between">
                <button
                  onClick={() => setShowParticipants(!showParticipants)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                  aria-label={showParticipants ? "Hide participants list" : `View ${meetingData?.data.participants.length} participants`}
                >
                  <Users className="w-5 h-5" />
                  <span>{meetingData?.data.participants.length}</span>
                  {showParticipants ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <ActionTooltip label="Meeting name">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <School2 className="w-5 h-5" />
                    <span>{meetingData?.data.name}</span>
                  </div>
                </ActionTooltip>
              </div>



              <div className="mt-4">
                {showParticipants ? (
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search participants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-full"
                      />
                    </div>
                    <ScrollArea className="h-[200px]">
                      {filteredParticipants?.map((participant) => (
                        <div
                          key={participant.user.id}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {/* <Users className="w-4 h-4" /> */}
                          <Avatar className="w-5 ">
                            <AvatarImage src={participant.user.avatar} alt={participant.user.fullname} />
                          </Avatar>
                          <div className="w-full flex items-center justify-between">
                            <span>
                              {/* {participant.user.fullname} */}
                              {formatName(participant.user.fullname)}
                            </span>

                            <span className="text-gray-500 text-xs dark:text-gray-400 flex items-center gap-2">
                              <ChartPie className="w-4 h-4" />
                              Happy
                              {/* {participant.user.email} */}
                            </span>

                          </div>
                        </div>
                      ))}
                      {filteredParticipants?.length === 0 && (
                        <div className="p-2 text-center text-gray-500">
                          No participants found
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                ) : (
                  recognitionPieComponent
                )}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Back to Main Window
              </button>
            </div>
          </div>
        </PiPWindow>
      )}
    </>
  );
}
