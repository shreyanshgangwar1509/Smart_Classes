'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend, Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// Define types for your data
interface AttendanceData {
  date: string;
  attendance: number;
}

interface ResourceData {
  resource: string;
  usage: number;
}

interface BehaviorData {
  student: string;
  engagement: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [behaviorData, setBehaviorData] = useState<BehaviorData[]>([]);

  useEffect(() => {
    // Fetch attendance data from the API
    // src\app\api\attendenceData
    axios.get('/api/attendenceData').then((response) => {
      setAttendanceData(response.data);
    });

    // Fetch resource data from the API
    // src\app\api\resourceUsage
    axios.get('/api/resourceUsage').then((response) => {
      setResourceData(response.data);
    });

    // Fetch behavior data from the API
    
    axios.get('/api/behaviorPatterns').then((response) => {
      setBehaviorData(response.data);
    });
  }, []);

  return (
    <div>
      {/* Attendance Analytics */}
      <h2>Attendance Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Resource Usage Analytics */}
      <h2>Resource Usage Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={resourceData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="resource" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Behavior Patterns */}
      <h2>Behavior Patterns</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={behaviorData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="student" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="engagement" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsDashboard;
