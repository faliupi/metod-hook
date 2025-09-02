"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartBarIcon,
  ChevronDownIcon,
  Download,
  MoreHorizontal,
  SortAscIcon,
  UserCog,
  X,
} from "lucide-react";
import Link from "next/link";
import { useModalStore } from "@/hooks/use-modal-store";
import { MeetingData } from "@/hooks/api/meeting-service-hooks";
import ActionTooltip from "@/components/action-tooltip";
import { RecognitionsDetail } from "@/hooks/api/recognition-service-hooks";

// Import socket.io-client
import { io } from "socket.io-client";

export interface UserParticipant {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  joinAt: string;
  leftAt: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
  };
}

interface MonitoringLog {
  timestamp: string;
  userId: string;
  status: string;
  message: string;
}

const fuzzyFilter: FilterFn<UserParticipant> = (row, columnId, filterValue: string) => {
  const searchValue = filterValue.toLowerCase();

  if (row.original.user) {
    if (
      row.original.user.fullname.toLowerCase().includes(searchValue) ||
      row.original.user.email.toLowerCase().includes(searchValue)
    ) {
      return true;
    }
  }

  if (row.original.joinAt) {
    if (new Date(row.original.joinAt).toLocaleString().toLowerCase().includes(searchValue)) {
      return true;
    }
  }

  return false;
};

// Status Lamp Component with tooltip and click handler
const StatusLamp: React.FC<{
  status: string;
  userId: string;
  userName: string;
  onStatusClick: (userId: string, userName: string) => void;
}> = ({ status, userId, userName, onStatusClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getColor = () => {
    if (status === "online") return "#22c55e"; // green
    return "#ef4444"; // red for offline or unknown
  };

  const getStatusText = () => {
    if (status === "online") return "Online - In Google Meet";
    return "Offline - Left Google Meet";
  };

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: getColor(),
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.2)" : "scale(1)",
          boxShadow: isHovered ? `0 0 10px ${getColor()}` : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onStatusClick(userId, userName)}
      />
      
      {/* Tooltip */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1f2937",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {getStatusText()}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #1f2937",
            }}
          />
        </div>
      )}
    </div>
  );
};

// Monitoring Popup Modal
const MonitoringModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  logs: MonitoringLog[];
  statusMap: Record<string, string>; // Changed from currentStatus to statusMap
}> = ({ isOpen, onClose, userId, userName, logs, statusMap }) => {
  if (!isOpen) return null;

  const userLogs = logs.filter(log => log.userId === userId);
  const currentStatus = statusMap[userId] || "unknown"; // Get status from statusMap

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "24px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#1f2937", fontSize: "20px", fontWeight: "bold" }}>
            Monitoring: {userName}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        {/* Current Status - Now synchronized with table */}
        <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: 
                  currentStatus === "online" ? "#22c55e" : "#ef4444", // Only green or red
              }}
            />
            <span style={{ fontWeight: "600", color: "#1f2937" }}>
              Status: {
                currentStatus === "online" ? "Online (In Meeting)" : "Offline (Left Meeting)"
              }
            </span>
          </div>
        </div>

        {/* Log Section */}
        <div>
          <h3 style={{ margin: "0 0 12px 0", color: "#1f2937", fontSize: "14px", fontWeight: "bold" }}>
            Activity Log:
          </h3>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "6px",
              height: "250px",
              overflowY: "auto",
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            {userLogs.length > 0 ? (
              userLogs.map((log, index) => (
                <div key={index} style={{ marginBottom: "8px", lineHeight: "1.4" }}>
                  <span style={{ color: "#6b7280" }}>[{log.timestamp}]</span>{" "}
                  <span style={{ 
                    color: log.status === "online" ? "#22c55e" : "#ef4444",
                    fontWeight: "600"
                  }}>
                    {log.status.toUpperCase()}
                  </span>{" "}
                  - {log.message}
                </div>
              ))
            ) : (
              <div style={{ color: "#6b7280", fontStyle: "italic" }}>
                No activity logs available for this user.
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Participants({
  participants,
  recognitionDetail,
  meetingData,
}: {
  participants: UserParticipant[];
  meetingData: MeetingData;
  recognitionDetail: RecognitionsDetail;
}) {
  const data = participants;
  const { onOpen } = useModalStore();
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Status Map untuk setiap peserta
  const [statusMap, setStatusMap] = React.useState<Record<string, string>>({});
  
  // Monitoring logs state
  const [monitoringLogs, setMonitoringLogs] = React.useState<MonitoringLog[]>([]);
  
  // Modal state
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    userId: string;
    userName: string;
  }>({
    isOpen: false,
    userId: "",
    userName: "",
  });

  // Connect ke Socket.io server
  React.useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("✅ Connected to Socket.io server");
    });

    socket.on("status-update", (payload: { userId: string; status: string }) => {
      const timestamp = new Date().toLocaleString();
      const user = participants.find(p => p.user.id === payload.userId);
      const userName = user ? user.user.fullname : `User ${payload.userId}`;
      
      // Update status map
      setStatusMap((prev) => ({
        ...prev,
        [payload.userId]: payload.status,
      }));

      // Add to monitoring logs
      const newLog: MonitoringLog = {
        timestamp,
        userId: payload.userId,
        status: payload.status,
        message: payload.status === "online" 
          ? `${userName} joined Google Meet` 
          : `${userName} left Google Meet - Warning popup displayed`,
      };

      setMonitoringLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
    });

    return () => {
      socket.disconnect();
    };
  }, [participants]);

  // Handle status lamp click
  const handleStatusClick = (userId: string, userName: string) => {
    setModalState({
      isOpen: true,
      userId,
      userName,
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      userId: "",
      userName: "",
    });
  };

  // Kolom tabel dengan enhanced status lamp
  const columnsData: ColumnDef<UserParticipant>[] = [
    {
      accessorKey: "status",
      header: () => (
        <div style={{ textAlign: "center" }}>
          Status
        </div>
      ),
      cell: ({ row }) => {
        const userId = row.original.user.id;
        const userName = row.original.user.fullname;
        const status = statusMap[userId] || "offline"; // Default to offline instead of unknown

        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <StatusLamp
              status={status}
              userId={userId}
              userName={userName}
              onStatusClick={handleStatusClick}
            />
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.original.user.fullname}</div>,
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.original.user.email}</div>,
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "joinAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Join
          <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          {new Date(row.original.joinAt).toLocaleString()}
        </div>
      ),
    },
  ];

  const getActionsColumn = (): ColumnDef<UserParticipant> => ({
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const classId = meetingData?.classId || "";
      const meetingId = meetingData?.id || "";
      const participantId = row.original.user.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/class/${classId}/m/${meetingId}/participant/${participantId}`}
                className="flex items-center"
              >
                <ChartBarIcon className="mr-2 h-4 w-4" />
                View Emotions Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <UserCog className="h-4 w-4" />
              Assign as Co-Teacher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  const columns: ColumnDef<UserParticipant>[] = [
    ...columnsData,
    getActionsColumn(),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <ActionTooltip label="Export meeting data">
          <Button
            className="ml-auto mr-2"
            onClick={() => onOpen("exportMeetingData", recognitionDetail)}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </ActionTooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Monitoring Modal - Now uses statusMap for synchronization */}
      <MonitoringModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        userId={modalState.userId}
        userName={modalState.userName}
        logs={monitoringLogs}
        statusMap={statusMap} // Pass the entire statusMap instead of single currentStatus
      />
    </div>
  );
}