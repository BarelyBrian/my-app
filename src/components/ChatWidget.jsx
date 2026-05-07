import React, { useState } from 'react';

const ChatWidget = ({ products = [] }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your StudySwap Assistant. Need help finding gear?", sender: "bot" }
    ]);
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { text: userInput, sender: "user" }];
        setMessages(newMessages);
        const query = userInput.toLowerCase();
        setUserInput("");

        // Simulated AI Response Logic
        setTimeout(() => {
            let botResponse = "I'm checking the campus inventory for you...";
            
            if (query.includes("hello") || query.includes("hi")) {
                botResponse = "Hey! What are we swapping today?";
            } else {
                const foundItems = products.filter(p => 
                    p.product_name.toLowerCase().includes(query)
                );
                if (foundItems.length > 0) {
                    botResponse = `I found ${foundItems.length} match(es) for "${query}". Check the product hub!`;
                }
            }
            setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
        }, 800);
    };

    return (
        <div className="chatbot-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 3000 }}>
            {isChatOpen && (
                <div className="glass-card mb-3 shadow-lg" style={{ 
                    width: '350px', height: '450px', 
                    background: 'rgba(15, 25, 35, 0.9)', 
                    backdropFilter: 'blur(25px)', 
                    border: '1px solid rgba(0, 210, 255, 0.4)', 
                    display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden' 
                }}>
                    {/* Header */}
                    <div style={{ background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', padding: '15px', color: 'white', fontWeight: 'bold' }}>
                        StudySwap Assistant
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.sender === 'user' ? '#00d2ff' : 'rgba(255,255,255,0.1)',
                                color: msg.sender === 'user' ? '#000' : '#fff',
                                padding: '8px 12px', borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                maxWidth: '85%', fontSize: '0.9rem', fontWeight: msg.sender === 'user' ? '600' : '400'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '15px', borderTop: '1px solid rgba(0, 210, 255, 0.2)' }}>
                        <div className="d-flex gap-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ask me anything..." 
                                value={userInput} 
                                onChange={(e) => setUserInput(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 210, 255, 0.3)', color: 'white' }} 
                            />
                            <button onClick={handleSendMessage} className="btn" style={{ background: '#00d2ff', color: '#000', fontWeight: 'bold' }}>Send</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button onClick={() => setIsChatOpen(!isChatOpen)} style={{ 
                width: '60px', height: '60px', borderRadius: '50%', 
                background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                border: 'none', color: 'white', fontSize: '24px', 
                boxShadow: '0 0 20px rgba(0, 210, 255, 0.5)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {isChatOpen ? '×' : '💬'}
            </button>
        </div>
    );
};

export default ChatWidget;