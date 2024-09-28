import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const AttendancePage = () => (
  <div className="attendance">
    <Input type="file" accept="image/*" />
    <Button>Mark Attendance</Button>
  </div>
);
export default AttendancePage;
