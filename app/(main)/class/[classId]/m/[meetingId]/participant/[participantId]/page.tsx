'use client'
import React from 'react';
import { useGetMeetingParticipantDetail } from '@/hooks/api/meeting-service-hooks';
import LineChart from '@/components/charts/line-chart';
import RadarChart from '@/components/charts/radar-chart';
import EmovalaroRecognition from '@/app/(main)/class/[classId]/m/components/emovalaro-recognition';

// Extend MeetingData type to include class for linter fix
import type { MeetingData as OriginalMeetingData } from '@/hooks/api/meeting-service-hooks';
type MeetingData = OriginalMeetingData & { class?: { name?: string } };

const ParticipantEmotionDetailPage = ({ params }: { params: { classId: string; meetingId: string; participantId: string } }) => {
  // In app directory, params are passed as props
  const { meetingId, participantId } = params;

  const { data, isLoading, error } = useGetMeetingParticipantDetail(meetingId, participantId);

  const participant = data?.data.participant;
  const recognition = data?.data.recognition;
  const meeting = data?.data.meeting as MeetingData;
  const className = meeting?.class?.name;
  const meetingName = meeting?.name;
  const participantName = participant?.user.fullname;
  const participantAvatar = participant?.user.avatar;

  const faceApiRecognition = data?.data.faceApiRecognition;
  const emovalaroRecognition = data?.data.emovalaroRecognition;
  const selectedModel = meeting?.selectedRecognitionModel;

  // Prepare chart data for face-api
  const chartData = React.useMemo(() => {
    if (!faceApiRecognition || faceApiRecognition.length === 0) return null;
    return {
      labels: faceApiRecognition.map((rec) => rec.createdAt),
      neutral: faceApiRecognition.map((rec) => rec.neutral),
      happy: faceApiRecognition.map((rec) => rec.happy),
      sad: faceApiRecognition.map((rec) => rec.sad),
      angry: faceApiRecognition.map((rec) => rec.angry),
      fearful: faceApiRecognition.map((rec) => rec.fearful),
      disgusted: faceApiRecognition.map((rec) => rec.disgusted),
      surprised: faceApiRecognition.map((rec) => rec.surprised),
    };
  }, [faceApiRecognition]);

  // Prepare chart data for emovalaro (radar)
  const radarData = React.useMemo(() => {
    if (!emovalaroRecognition || !emovalaroRecognition.emotions) return null;
    return {
      labels: emovalaroRecognition.emotions.map((e) => e.emotion),
      datasets: [
        {
          label: 'Valence',
          data: emovalaroRecognition.emotions.map((e) => e.valence),
        },
        {
          label: 'Arousal',
          data: emovalaroRecognition.emotions.map((e) => e.arousal),
        },
      ],
    };
  }, [emovalaroRecognition]);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading participant details.</div>;

  return (
    <div className="p-0 sm:p-0 md:p-10 w-full min-h-screen bg-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8">
        {participantAvatar ? (
          <img src={participantAvatar} alt={participantName} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary shadow" />
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-500 border-2 border-primary shadow">
            {participantName?.[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xl md:text-2xl font-semibold text-gray-800 truncate">{participantName}</div>
          {meetingName && <div className="text-sm md:text-base text-gray-500 truncate">Meeting: <span className="font-medium text-gray-700">{meetingName}</span></div>}
          {className && <div className="text-sm md:text-base text-gray-400 truncate">Class: <span className="font-medium text-gray-600">{className}</span></div>}
        </div>
      </div>
      <div className="mb-8 w-full">
        <div className="font-semibold mb-2 text-gray-700 text-base md:text-lg px-4 md:px-8">Emotion Timeline</div>
        <div className="h-[60vh] md:h-[70vh] bg-white rounded-none shadow-none p-0 md:p-4 border-0 w-full overflow-x-auto flex items-center justify-center">
          {selectedModel === 'FACE_API' && chartData ? (
            <LineChart data={chartData} />
          ) : selectedModel === 'EMOVALARO' && emovalaroRecognition ? (
            <div className="w-full h-full flex items-center justify-center">
              <EmovalaroRecognition data={emovalaroRecognition.emotions} />
            </div>
          ) : (
            <div className="text-gray-400 text-center py-12">No emotion data available.</div>
          )}
        </div>
      </div>
      {/* <div className="mb-4 p-4 border rounded-xl bg-gray-50 shadow w-full max-w-2xl mx-auto">
        <div className="font-semibold text-gray-700 mb-1 text-base md:text-lg">Participant Info</div>
        <div className="text-gray-600 text-sm md:text-base">Email: <span className="font-medium text-gray-800">{participant?.user.email}</span></div>
        <div className="text-gray-600 text-sm md:text-base">Joined At: <span className="font-medium text-gray-800">{participant?.joinAt ? new Date(participant.joinAt).toLocaleString() : '-'}</span></div>
      </div> */}
    </div>
  );
};

export default ParticipantEmotionDetailPage; 