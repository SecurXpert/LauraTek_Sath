import { useState } from "react";
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Play, RefreshCw, Code2, Terminal, Clock } from "lucide-react";
import Sidebar from "../sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";
 
const codingQuestions = [
  {
    id: 1,
    title: "Check Even or Odd",
    question: "Write a program to read an integer and print even or odd.",
    scenario: "Using if-else statement.",
    expectedOutput: "Input: 4 -> Output: Even\nInput: 7 -> Output: Odd"
  }
];

const Compiler = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Compiler");
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleRunCode = () => {
    if (selectedLanguage !== 'javascript') {
      setError('Only JavaScript is supported in this demo. Use a backend service like Judge0 for other languages.');
      setOutput('');
      return;
    }
    setOutput('');
    setError('');
    try {
      const logs: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.join(' '));
      };
 
      // eslint-disable-next-line no-eval
      eval(code);
 
      console.log = originalConsoleLog;
      setOutput(logs.join('\n') || 'No output');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };
 
  const handleClearCode = () => {
    setCode('// Write your JavaScript code here\nconsole.log("Hello, World!");');
    setOutput('');
    setError('');
  };
 
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f7fafd] to-blue-50">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Profileheader />

        {/* Content Area */}
        <main className="p-4 flex-1 overflow-auto"> {/* Reduced padding for wider content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-full" // Full width
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="w-full border-0 shadow-xl bg-white/80 backdrop-blur-sm"> {/* Full width, enhanced styling */}
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Code className="h-7 w-7" />
                    Online Compiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-screen"> {/* Full height for editor expansion */}
                    <motion.div 
                      className="lg:col-span-1 p-6 border-r border-gray-200/50 bg-gradient-to-b from-white to-gray-50" // Enhanced panel
                      variants={cardVariants}
                      whileHover="hover"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h3 
                        className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Code2 className="h-5 w-5 text-indigo-600" />
                        Coding Questions
                      </motion.h3>
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="p-4 bg-white/70 backdrop-blur-sm border border-indigo-200/50">
                          <h4 className="font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Question 1: {codingQuestions[0].title}
                          </h4>
                          <div className="space-y-3">
                            <Card className="p-4 bg-blue-50 border border-blue-200/50">
                              <h5 className="text-sm font-semibold text-blue-700 flex items-center gap-1 mb-2">
                                <Code className="h-3 w-3" />
                                Question
                              </h5>
                              <p className="text-sm text-gray-600">{codingQuestions[0].question}</p>
                            </Card>
                            <Card className="p-4 bg-green-50 border border-green-200/50">
                              <h5 className="text-sm font-semibold text-green-700 flex items-center gap-1 mb-2">
                                <Clock className="h-3 w-3" />
                                Scenario
                              </h5>
                              <p className="text-sm text-gray-600">{codingQuestions[0].scenario}</p>
                            </Card>
                            <Card className="p-4 bg-purple-50 border border-purple-200/50">
                              <h5 className="text-sm font-semibold text-purple-700 flex items-center gap-1 mb-2">
                                <Terminal className="h-3 w-3" />
                                Expected Output
                              </h5>
                              <p className="text-sm text-gray-600 whitespace-pre-line bg-white p-2 rounded-md border">{codingQuestions[0].expectedOutput}</p>
                            </Card>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
 
                    <motion.div 
                      className="lg:col-span-3 p-6 bg-white/90 backdrop-blur-sm" // Full width expansion
                      variants={cardVariants}
                      whileHover="hover"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="flex items-center space-x-4 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                          <SelectTrigger className="w-[200px] bg-white/50 backdrop-blur-sm border-indigo-200">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 backdrop-blur-sm border-indigo-200">
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                          </SelectContent>
                        </Select>
                        <motion.button 
                          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={handleRunCode}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Play className="inline mr-2 h-4 w-4" />
                          Run Code
                        </motion.button>
                        <motion.button 
                          className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={handleClearCode}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <RefreshCw className="inline mr-2 h-4 w-4 animate-spin" />
                          Clear
                        </motion.button>
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Code2 className="h-5 w-5 text-indigo-600" />
                        Code Editor
                      </motion.h3>
                      <motion.div 
                        className="border border-gray-200/50 rounded-xl mb-6 overflow-hidden shadow-md" // Rounded for editor container
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <AceEditor
                          mode="javascript"
                          theme="monokai"
                          value={code}
                          onChange={(newCode) => setCode(newCode)}
                          name="code-editor"
                          editorProps={{ $blockScrolling: true }}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                            fontSize: 14,
                            showPrintMargin: false,
                          }}
                          style={{ width: '100%', height: '400px' }} // Increased height for better usability
                        />
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Terminal className="h-5 w-5 text-green-600" />
                        Output
                      </motion.h3>
                      <motion.div 
                        className="w-full min-h-[200px] p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 overflow-auto" // Full width, increased height
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        whileHover={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
                      >
                        {error ? (
                          <motion.pre 
                            className="text-red-600 whitespace-pre-wrap font-mono text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            {error}
                          </motion.pre>
                        ) : (
                          <motion.pre 
                            className="text-foreground whitespace-pre-wrap font-mono text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            {output || 'Run the code to see output here...'}
                          </motion.pre>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Compiler;