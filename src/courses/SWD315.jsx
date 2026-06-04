import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [

  // ── ABBREVIATIONS & FULL MEANINGS ──
  { cat: "Abbreviations", q: "What does ISP stand for and what does it do?", a: "ISP = Internet Service Provider\nA company that provides individuals and organizations access to the Internet and related services.\nExamples in Nigeria: MTN, Airtel, Glo, IPNX, Spectranet, Swift Networks, Smile.\nISPs connect users to the internet backbone via fiber, DSL, wireless, or satellite links." },
  { cat: "Abbreviations", q: "What does TCP/IP stand for and what is it?", a: "TCP = Transmission Control Protocol\nIP = Internet Protocol\nTCP/IP is the foundational communication protocol suite of the Internet.\n• TCP: ensures reliable, ordered, error-checked delivery of data between apps.\n• IP: handles addressing and routing of packets across networks.\nTCP operates at Layer 4 (Transport); IP operates at Layer 3 (Network) of the OSI model." },
  { cat: "Abbreviations", q: "What does OSI stand for and list all 7 layers?", a: "OSI = Open Systems Interconnection (model)\nDeveloped by ISO to standardize network communication.\n7 Layers (top to bottom):\n1. Physical – raw bit transmission\n2. Data Link – node-to-node framing (MAC addresses)\n3. Network – routing (IP addresses)\n4. Transport – end-to-end delivery (TCP/UDP)\n5. Session – session management\n6. Presentation – data formatting, encryption\n7. Application – user-facing protocols (HTTP, FTP, DNS)\nMnemonic: 'Please Do Not Throw Sausage Pizza Away'" },
  { cat: "Abbreviations", q: "What does DNS stand for and what is its function?", a: "DNS = Domain Name System\nTranslates human-readable domain names (e.g. www.google.com) into IP addresses (e.g. 142.250.64.68) that computers use to route traffic.\nCommand to query DNS: nslookup <domain>\nDNS uses port 53 (UDP/TCP).\nTypes: A record, AAAA, CNAME, MX, NS, PTR, SOA." },
  { cat: "Abbreviations", q: "What does DHCP stand for and how does it work?", a: "DHCP = Dynamic Host Configuration Protocol\nAutomatically assigns IP address, subnet mask, default gateway, and DNS server to devices on a network.\nProcess (DORA):\n1. Discover – client broadcasts request\n2. Offer – server offers an IP\n3. Request – client accepts the offer\n4. Acknowledge – server confirms assignment\nPort: 67 (server), 68 (client). UDP-based.\nCommand: ipconfig /release then ipconfig /renew" },
  { cat: "Abbreviations", q: "What does NAT stand for and why is it used?", a: "NAT = Network Address Translation\nAllows multiple devices on a private network to share a single public IP address.\nTypes:\n• Static NAT – one-to-one mapping\n• Dynamic NAT – pool of public IPs\n• PAT (Port Address Translation) / Overload – many-to-one (most common, used in homes)\nBenefit: Conserves IPv4 addresses and adds a layer of security by hiding internal IPs." },
  { cat: "Abbreviations", q: "What does VLAN stand for and what is its purpose?", a: "VLAN = Virtual Local Area Network\nA logically segmented network within a physical switch, allowing devices to be grouped regardless of physical location.\nBenefits:\n• Security – isolates traffic between departments\n• Reduces broadcast domains\n• Flexibility – users in different locations can be on same VLAN\nConfigured on switches. VLANs communicate via a Layer 3 router (inter-VLAN routing) or Layer 3 switch." },
  { cat: "Abbreviations", q: "What does STP stand for in networking?", a: "STP = Spanning Tree Protocol (IEEE 802.1D)\nPrevents switching loops in Ethernet networks with redundant links by blocking certain ports.\nElects a Root Bridge; non-root bridges calculate best path to root.\nPort states: Blocking → Listening → Learning → Forwarding → Disabled\nRSTP (Rapid STP, 802.1w) is the faster modern version." },
  { cat: "Abbreviations", q: "What does WAN stand for vs LAN vs MAN?", a: "LAN = Local Area Network – covers a small geographic area (office, building). High speed.\nMAN = Metropolitan Area Network – covers a city or campus. Medium range.\nWAN = Wide Area Network – covers large geographic areas (countries, continents). Uses ISP links.\nExamples: Home WiFi = LAN; MTN network in Lagos = MAN; Internet = WAN." },
  { cat: "Abbreviations", q: "What does ACL stand for and what does it do?", a: "ACL = Access Control List\nA set of rules on a router or switch that permit or deny network traffic based on criteria (IP address, protocol, port).\nTypes:\n• Standard ACL (1–99): filters by source IP only. Place closest to destination.\n• Extended ACL (100–199): filters by source IP, destination IP, protocol, port. Place closest to source.\nDefault: implicit deny all at end of every ACL." },
  { cat: "Abbreviations", q: "What does RIP stand for and how does it work?", a: "RIP = Routing Information Protocol\nA distance-vector routing protocol that uses hop count as metric.\n• Max hop count = 15 (16 = unreachable)\n• Sends routing table updates every 30 seconds\n• RIPv1: classful (no subnet info)\n• RIPv2: classless (carries subnet mask)\nBest for small networks. Configure with: router rip → network [network-address]" },
  { cat: "Abbreviations", q: "What does EIGRP stand for and how does it differ from RIP?", a: "EIGRP = Enhanced Interior Gateway Routing Protocol\nCisco proprietary advanced distance-vector protocol.\nUses DUAL (Diffusing Update Algorithm) for loop-free, fast convergence.\nMetric: bandwidth + delay (also considers reliability, load, MTU)\nNo max hop count limit (255).\nMore efficient than RIP: sends partial updates only when topology changes." },
  { cat: "Abbreviations", q: "What does OSPF stand for and what type of protocol is it?", a: "OSPF = Open Shortest Path First\nA link-state routing protocol using Dijkstra's algorithm to calculate shortest path.\nUses Areas (Area 0 = backbone)\nMetric: Cost (based on bandwidth)\nFast convergence; scales well in large networks.\nOpen standard (not Cisco proprietary). Works with both IPv4 and IPv6 (OSPFv3)." },
  { cat: "Abbreviations", q: "What does SVI stand for?", a: "SVI = Switched Virtual Interface\nA virtual interface on a Layer 3 switch (or VLAN interface) that provides an IP address to a VLAN for Layer 3 routing and management.\nUse:\n• Assign an IP to manage a switch (e.g. VLAN 1 management)\n• Enable inter-VLAN routing without a separate router\nConfigured with: interface vlan [vlan-id] → ip address [ip] [mask] → no shutdown" },
  { cat: "Abbreviations", q: "What does ARP stand for and how does it work?", a: "ARP = Address Resolution Protocol\nMaps an IP address (Layer 3) to a MAC address (Layer 2) on a local network.\nProcess:\n1. Device broadcasts 'Who has IP x.x.x.x? Tell [my IP]'\n2. Device with that IP replies with its MAC address\n3. Sender caches the IP-to-MAC mapping\nCommand: arp -a (to view ARP cache)\nGratuitous ARP: device announces its own IP/MAC mapping." },
  { cat: "Abbreviations", q: "What does ICMP stand for and when is it used?", a: "ICMP = Internet Control Message Protocol\nUsed for diagnostic and error-reporting functions in IP networks.\nCommon uses:\n• ping – tests reachability (ICMP Echo Request/Reply)\n• traceroute/tracert – traces packet path hop by hop\n• Network unreachable, TTL exceeded messages\nOperates at Layer 3 (Network layer). Not used for data transfer." },
  { cat: "Abbreviations", q: "What does HTTP and HTTPS stand for? Differences?", a: "HTTP = HyperText Transfer Protocol (Port 80)\nHTTPS = HTTP Secure (Port 443)\nHTTP transfers web pages in plaintext.\nHTTPS encrypts data using SSL/TLS, protecting data in transit.\nDifferences:\n• HTTPS requires a digital certificate (SSL/TLS)\n• HTTPS prevents man-in-the-middle attacks\n• Modern websites should always use HTTPS\nOperate at Layer 7 (Application layer)." },
  { cat: "Abbreviations", q: "What does FTP stand for and what ports does it use?", a: "FTP = File Transfer Protocol\nUsed to transfer files between a client and server.\n• Port 20: data transfer\n• Port 21: control/commands\nFTP sends data in plaintext (insecure).\nAlternatives:\n• SFTP (SSH File Transfer Protocol, Port 22) – encrypted\n• FTPS (FTP Secure) – FTP with SSL/TLS\nOperate at Layer 7 (Application)." },
  { cat: "Abbreviations", q: "What does MAC stand for in networking?", a: "MAC = Media Access Control\nA unique 48-bit (6-byte) hardware address assigned to a NIC (Network Interface Card).\nWritten as: 00:1A:2B:3C:4D:5E (hexadecimal, separated by colons or hyphens)\nFirst 3 bytes = OUI (Organizationally Unique Identifier – manufacturer)\nLast 3 bytes = unique device identifier\nOperate at Layer 2 (Data Link). Used by switches for frame forwarding." },
  { cat: "Abbreviations", q: "What does MTU stand for and what is the default value for Ethernet?", a: "MTU = Maximum Transmission Unit\nThe largest size (in bytes) of a packet/frame that can be sent over a network link without fragmentation.\nDefault Ethernet MTU = 1500 bytes\nIf a packet exceeds MTU, it gets fragmented (IPv4) or dropped with 'Packet Too Big' message (IPv6).\nCheck with: ping -l 1500 [IP] or show interfaces [int] on Cisco IOS." },
  { cat: "Abbreviations", q: "What does NIC stand for?", a: "NIC = Network Interface Card\nHardware component that connects a computer to a network.\nEach NIC has a unique MAC address burned in by the manufacturer.\nCan be wired (Ethernet) or wireless (WiFi).\nOperates at Layer 1 and Layer 2 of the OSI model." },
  { cat: "Abbreviations", q: "What does TTL stand for in networking?", a: "TTL = Time To Live\nA value in an IP packet header that limits the packet's lifetime in the network.\nEach router hop decrements TTL by 1.\nWhen TTL reaches 0, router drops the packet and sends ICMP 'Time Exceeded' message back to source.\nPrevents routing loops from causing infinite packet circulation.\nDefault TTL: Windows = 128, Linux/Cisco = 64." },
  { cat: "Abbreviations", q: "What does VPN stand for and how does it work?", a: "VPN = Virtual Private Network\nCreates an encrypted tunnel over a public network (Internet), allowing secure remote access.\nTypes:\n• Site-to-Site VPN – connects two office networks\n• Remote Access VPN – individual connects to company network\nProtocols: IPSec, SSL/TLS, OpenVPN, L2TP\nBenefit: encrypts data, masks IP address, bypasses geo-restrictions." },
  { cat: "Abbreviations", q: "What does SSID stand for in wireless networking?", a: "SSID = Service Set Identifier\nThe name of a wireless (WiFi) network broadcast by an access point.\nClients use SSID to identify and connect to a specific wireless network.\nDefault SSIDs are often the router brand (e.g. 'Linksys'). Should be changed for security.\nSSID broadcasting can be disabled (hidden network) but this provides minimal security improvement." },
  { cat: "Abbreviations", q: "What does WEP, WPA, WPA2 stand for and which is most secure?", a: "WEP = Wired Equivalent Privacy – original, now broken/insecure\nWPA = Wi-Fi Protected Access – improved, uses TKIP\nWPA2 = Wi-Fi Protected Access 2 – uses AES encryption, current standard\nWPA3 = latest, strongest encryption\nOrder of security (weakest to strongest): WEP < WPA < WPA2 < WPA3\nAlways use WPA2 or WPA3 on modern networks." },
  { cat: "Abbreviations", q: "What does PDU stand for in each OSI layer?", a: "PDU = Protocol Data Unit – the name for data at each OSI layer:\nLayer 7-5 (Application/Presentation/Session) = Data\nLayer 4 (Transport) = Segment (TCP) / Datagram (UDP)\nLayer 3 (Network) = Packet\nLayer 2 (Data Link) = Frame\nLayer 1 (Physical) = Bit\nMemory tip: 'Data Segments Pack Frames into Bits'" },
  { cat: "Abbreviations", q: "What does STP (cabling) stand for vs UTP?", a: "UTP = Unshielded Twisted Pair – most common, cheaper, susceptible to EMI\nSTP = Shielded Twisted Pair – has foil/braid shield, resists EMI, more expensive\nBoth use RJ-45 connectors.\nCategories:\n• Cat5e – up to 1 Gbps, 100m\n• Cat6 – up to 10 Gbps at 55m, 1 Gbps at 100m\n• Cat6a – up to 10 Gbps at 100m\nTwisting reduces crosstalk and electromagnetic interference." },
  { cat: "Abbreviations", q: "What does QoS stand for?", a: "QoS = Quality of Service\nA set of techniques to manage network resources by prioritizing certain types of traffic.\nEnsures critical applications (VoIP, video conferencing) get bandwidth priority over less critical traffic (file downloads).\nMechanisms: Traffic shaping, policing, queuing, classification, marking.\nImportant for networks carrying real-time traffic." },

  // ── NETWORKING BASICS ──
  { cat: "Networking Basics", q: "What are the differences between a Hub, Switch, and Router?", a: "Hub (Layer 1 – Physical):\n• Broadcasts data to ALL ports\n• Creates one large collision domain\n• Obsolete today\n\nSwitch (Layer 2 – Data Link):\n• Forwards frames only to the correct port using MAC table\n• Each port = separate collision domain\n• Creates one broadcast domain (per VLAN)\n\nRouter (Layer 3 – Network):\n• Routes packets between different networks using IP addresses\n• Separates broadcast domains\n• Connects LANs to WANs and the Internet" },
  { cat: "Networking Basics", q: "What is a collision domain vs a broadcast domain?", a: "Collision Domain:\n• A network segment where data collisions can occur\n• Each switch port = 1 collision domain (switches eliminate collisions)\n• Hub creates 1 collision domain for all connected devices\n\nBroadcast Domain:\n• All devices that receive a broadcast frame\n• Switches do NOT break broadcast domains (unless VLANs)\n• Routers BREAK broadcast domains (each router interface = separate broadcast domain)\n• VLANs also separate broadcast domains on switches" },
  { cat: "Networking Basics", q: "What are the cable wiring standards T568A and T568B? When do you use each cable type?", a: "T568A Pin Order: WG, G, WO, B, WB, O, WBr, Br\nT568B Pin Order: WO, O, WG, B, WB, G, WBr, Br\n\nStraight-through cable (same standard both ends – T568B/T568B):\n→ Use to connect unlike devices: PC to Switch, Switch to Router\n\nCrossover cable (T568A one end, T568B other end):\n→ Use to connect like devices: Switch to Switch, PC to PC, Router to Router\n\nModern switches have Auto-MDI/MDIX – automatically detect cable type." },
  { cat: "Networking Basics", q: "What is the difference between TCP and UDP?", a: "TCP (Transmission Control Protocol):\n• Connection-oriented (3-way handshake: SYN, SYN-ACK, ACK)\n• Reliable – guarantees delivery, ordering, error checking\n• Slower due to overhead\n• Used for: HTTP, FTP, SMTP, SSH, Telnet\n\nUDP (User Datagram Protocol):\n• Connectionless – no handshake\n• Unreliable – no guaranteed delivery\n• Faster – less overhead\n• Used for: DNS, DHCP, VoIP, video streaming, online gaming" },
  { cat: "Networking Basics", q: "What is the OSI model and why is it important?", a: "The OSI (Open Systems Interconnection) model is a 7-layer conceptual framework that standardizes network communication functions.\n\nImportance:\n• Allows different vendors' products to interoperate\n• Helps troubleshoot by isolating problems to specific layers\n• Provides common language for network professionals\n\nLayers: Physical → Data Link → Network → Transport → Session → Presentation → Application\n\nEach layer only interacts with the layer directly above and below it." },
  { cat: "Networking Basics", q: "What is the difference between full-duplex and half-duplex communication?", a: "Half-Duplex:\n• One direction at a time\n• Must wait before transmitting while the other side is transmitting\n• Creates collisions on shared media\n• Example: Walkie-talkie, old hub networks\n\nFull-Duplex:\n• Both directions simultaneously\n• No collisions – separate transmit and receive paths\n• Example: Telephone, modern switch connections\n\nModern Ethernet switch-to-device links operate in full-duplex. Duplex mismatch (one side full, other half) causes performance issues." },
  { cat: "Networking Basics", q: "What is encapsulation in networking?", a: "Encapsulation is the process of adding header (and sometimes trailer) information to data as it passes down the OSI layers from Application to Physical.\n\nEach layer adds its own header:\nApplication → adds data\nTransport → adds TCP/UDP header (port numbers) = Segment\nNetwork → adds IP header (source/destination IP) = Packet\nData Link → adds Frame header (MAC addresses) + trailer (FCS) = Frame\nPhysical → converts to bits\n\nDe-encapsulation is the reverse process at the receiving end." },
  { cat: "Networking Basics", q: "What ports are used by common application-layer protocols?", a: "FTP Data: 20\nFTP Control: 21\nSSH: 22\nTelnet: 23\nSMTP: 25\nDNS: 53\nHTTP: 80\nPOP3: 110\nIMAP: 143\nHTTPS: 443\nRDP: 3389\nDHCP: 67 (server), 68 (client)\nSNMP: 161\nTFTP: 69\n\nMemory tip: Know 20,21,22,23,25,53,80,443 by heart for exams and interviews." },
  { cat: "Networking Basics", q: "What is a default gateway and why is it needed?", a: "A default gateway is the IP address of the router interface that a device sends traffic to when the destination is on a different network.\n\nIf a device wants to communicate outside its subnet, it sends the packet to the default gateway (router).\nThe router then routes the packet toward the destination network.\n\nWithout a default gateway, a device can only communicate within its own subnet.\n\nExample: PC (192.168.1.10), Gateway (192.168.1.1) → PC sends all external traffic to 192.168.1.1" },
  { cat: "Networking Basics", q: "What is a private IP address range (RFC 1918)?", a: "Private IP ranges (not routable on public Internet):\n• Class A: 10.0.0.0 – 10.255.255.255 (/8)\n• Class B: 172.16.0.0 – 172.31.255.255 (/12)\n• Class C: 192.168.0.0 – 192.168.255.255 (/16)\n\nThese are used in LANs and NAT is used to translate them to public IPs for Internet access.\nLoopback: 127.0.0.0/8 (127.0.0.1 = localhost)\nAPIPa/Link-local: 169.254.0.0/16 (assigned when DHCP fails)" },

  // ── SUBNETTING ──
  { cat: "Subnetting", q: "What is subnetting and why is it used?", a: "Subnetting is dividing a large IP network into smaller sub-networks (subnets).\n\nReasons:\n1. Efficient IP address use – avoid waste\n2. Reduce broadcast domains – improves performance\n3. Improve security – isolate network segments\n4. Easier network management\n\nSubnetting uses a subnet mask to determine which part of an IP address is the network portion and which is the host portion.\n\nKey formula: Usable hosts per subnet = 2^h – 2 (h = host bits; -2 for network and broadcast addresses)" },
  { cat: "Subnetting", q: "What are the IP address classes and their default subnet masks?", a: "Class A: 1.0.0.0 – 126.255.255.255 | Default mask: 255.0.0.0 (/8) | 16M hosts/network\nClass B: 128.0.0.0 – 191.255.255.255 | Default mask: 255.255.0.0 (/16) | 65K hosts\nClass C: 192.0.0.0 – 223.255.255.255 | Default mask: 255.255.255.0 (/24) | 254 hosts\nClass D: 224.0.0.0 – 239.255.255.255 | Multicast\nClass E: 240.0.0.0 – 255.255.255.255 | Reserved/Experimental\n127.x.x.x = Loopback (reserved)" },
  { cat: "Subnetting", q: "Subnet 192.168.1.0/24 into subnets of 50 hosts each. Give the subnet mask and number of subnets.", a: "Need at least 50 hosts per subnet.\nFormula: 2^h – 2 ≥ 50 → h = 6 (2^6 – 2 = 62 hosts)\n\nHost bits = 6\nSubnet bits borrowed from host portion = 8 – 6 = 2\nNew prefix = /24 + 2 = /26\nSubnet mask = 255.255.255.192\n\nNumber of subnets = 2^2 = 4\nBlock size = 64\n\nSubnets:\n• 192.168.1.0/26 (hosts: .1–.62, broadcast .63)\n• 192.168.1.64/26 (hosts: .65–.126, broadcast .127)\n• 192.168.1.128/26 (hosts: .129–.190, broadcast .191)\n• 192.168.1.192/26 (hosts: .193–.254, broadcast .255)" },
  { cat: "Subnetting", q: "What is CIDR notation and how does it relate to subnet masks?", a: "CIDR = Classless Inter-Domain Routing\nExpresses the subnet mask as a prefix (number of 1-bits in the mask).\n\nExamples:\n/8  = 255.0.0.0\n/16 = 255.255.0.0\n/24 = 255.255.255.0\n/25 = 255.255.255.128\n/26 = 255.255.255.192\n/27 = 255.255.255.224\n/28 = 255.255.255.240\n/29 = 255.255.255.248\n/30 = 255.255.255.252 (for point-to-point links, 2 usable hosts)" },
  { cat: "Subnetting", q: "Given IP 172.16.45.14/20, find the network address, broadcast, and host range.", a: "Mask for /20 = 255.255.240.0\n\nOctet 3: 45 in binary = 00101101\nMask octet 3: 11110000 = 240\nNetwork bits: 0010 → Network octet 3 = 0010 0000 = 32\n\nNetwork address: 172.16.32.0\nBroadcast: 172.16.47.255 (next network 172.16.48.0 – 1)\nFirst host: 172.16.32.1\nLast host: 172.16.47.254\nUsable hosts: 2^12 – 2 = 4094" },
  { cat: "Subnetting", q: "What is VLSM (Variable Length Subnet Masking)?", a: "VLSM allows subnets of different sizes within the same major network, by using different prefix lengths for different subnets.\n\nBenefit: More efficient IP address allocation – match subnet size to actual need.\n\nExample:\n• Department A needs 100 hosts → /25 (126 hosts)\n• Department B needs 28 hosts → /27 (30 hosts)\n• WAN link needs 2 hosts → /30\n\nAll from the same major network like 10.0.0.0/8.\nVLSM requires a classless routing protocol (RIPv2, EIGRP, OSPF) that carries subnet mask information." },
  { cat: "Subnetting", q: "Quick-reference: Common subnet masks and their properties", a: "/24 = 255.255.255.0 → 254 hosts, 1 subnet from /24\n/25 = 255.255.255.128 → 126 hosts, 2 subnets\n/26 = 255.255.255.192 → 62 hosts, 4 subnets\n/27 = 255.255.255.224 → 30 hosts, 8 subnets\n/28 = 255.255.255.240 → 14 hosts, 16 subnets\n/29 = 255.255.255.248 → 6 hosts, 32 subnets\n/30 = 255.255.255.252 → 2 hosts (point-to-point links)\n/32 = 255.255.255.255 → 1 host (specific host route)" },

  // ── ACL (ACCESS CONTROL LIST) ──
  { cat: "ACL", q: "What are the two types of Cisco ACLs and how do they differ?", a: "Standard ACL (numbered 1–99, 1300–1999):\n• Filters based on SOURCE IP address ONLY\n• Less specific\n• Placed CLOSEST TO DESTINATION (to avoid blocking too broadly)\n\nExtended ACL (numbered 100–199, 2000–2699):\n• Filters by source IP, destination IP, protocol (TCP/UDP/ICMP), port number\n• More specific and powerful\n• Placed CLOSEST TO SOURCE (to stop unwanted traffic early)\n\nNamed ACLs can be either standard or extended but referenced by name instead of number." },
  { cat: "ACL", q: "What is the implicit deny at the end of every ACL?", a: "Every Cisco ACL has an implicit 'deny any' statement at the very end, even if you don't write it.\n\nThis means: any traffic not explicitly permitted by ACL rules is automatically DENIED.\n\nImplication:\n• If you forget to include a permit statement for legitimate traffic, it will be blocked silently.\n• Always ensure you have a 'permit any' or specific permit statements for all needed traffic.\n• You can verify with: show access-lists (denied packet count helps confirm what's being blocked)" },
  { cat: "ACL", q: "Write a Cisco IOS command to create an extended ACL that blocks HTTP from 192.168.1.0/24 to any destination.", a: "Router(config)#access-list 100 deny tcp 192.168.1.0 0.0.0.255 any eq 80\nRouter(config)#access-list 100 permit ip any any\n\nExplanation:\n• 100 = extended ACL number\n• deny tcp = deny TCP protocol\n• 192.168.1.0 0.0.0.255 = source network (wildcard mask)\n• any = any destination\n• eq 80 = port 80 (HTTP)\n• Last line: permit all other traffic (otherwise implicit deny blocks everything)\n\nApply to interface:\nRouter(config-if)#ip access-group 100 in" },
  { cat: "ACL", q: "What is a wildcard mask and how is it different from a subnet mask?", a: "Wildcard mask is the inverse of a subnet mask, used in ACLs and OSPF.\n\nTo find wildcard mask: subtract subnet mask from 255.255.255.255\n\nExamples:\n• /24 mask = 255.255.255.0 → wildcard = 0.0.0.255\n• /26 mask = 255.255.255.192 → wildcard = 0.0.0.63\n• /30 mask = 255.255.255.252 → wildcard = 0.0.0.3\n\nIn wildcard: 0 = must match, 1 = don't care\nShortcuts:\n• host = 0.0.0.0 (exact match one host)\n• any = 255.255.255.255 (match all)" },
  { cat: "ACL", q: "How do you apply an ACL to a router interface and what does 'in' vs 'out' mean?", a: "Apply an ACL to an interface in a specific direction:\nRouter(config-if)#ip access-group [acl-number] {in|out}\n\nin = filters traffic ENTERING the interface (coming into the router from that network)\nout = filters traffic LEAVING the interface (going out from the router to that network)\n\nBest practice:\n• Extended ACLs → apply inbound, close to source\n• Standard ACLs → apply outbound, close to destination\n\nVerify: show ip interface [interface] (shows which ACLs are applied and direction)" },
  { cat: "ACL", q: "Write an ACL that only permits traffic from host 10.0.0.5 to access a server at 172.16.1.100 via Telnet.", a: "Router(config)#access-list 101 permit tcp host 10.0.0.5 host 172.16.1.100 eq 23\nRouter(config)#access-list 101 deny ip any any\n\nExplanation:\n• 101 = extended ACL\n• tcp = Telnet uses TCP\n• host 10.0.0.5 = exact source (wildcard 0.0.0.0)\n• host 172.16.1.100 = exact destination\n• eq 23 = port 23 (Telnet)\n• Final deny ip any any = explicit deny (optional but good practice for clarity)" },

  // ── SVI & INTER-VLAN ROUTING ──
  { cat: "SVI & VLANs", q: "How do you configure an SVI for management on a Cisco switch?", a: "Step-by-step to configure SVI on VLAN 1:\n\nSwitch>enable\nSwitch#configure terminal\nSwitch(config)#interface vlan 1\nSwitch(config-if)#ip address 192.168.1.10 255.255.255.0\nSwitch(config-if)#no shutdown\nSwitch(config-if)#exit\nSwitch(config)#ip default-gateway 192.168.1.1\nSwitch(config)#end\nSwitch#copy run start\n\nVerify: show interfaces vlan 1" },
  { cat: "SVI & VLANs", q: "What is inter-VLAN routing and how is it implemented?", a: "Inter-VLAN routing allows devices in different VLANs to communicate.\n\nMethod 1: Router-on-a-Stick\n• Single physical link between router and switch (trunk)\n• Router has subinterfaces (one per VLAN)\n• Example:\n  Router(config)#interface Fa0/0.10\n  Router(config-subif)#encapsulation dot1q 10\n  Router(config-subif)#ip address 192.168.10.1 255.255.255.0\n\nMethod 2: Layer 3 Switch with SVIs\n• Create SVI for each VLAN with IP address\n• Enable IP routing: ip routing\n• More efficient, no physical router needed" },
  { cat: "SVI & VLANs", q: "How do you create and assign a VLAN on a Cisco switch?", a: "Step 1: Create VLAN\nSwitch(config)#vlan 10\nSwitch(config-vlan)#name SALES\nSwitch(config-vlan)#exit\n\nStep 2: Assign port to VLAN (access mode)\nSwitch(config)#interface fa0/1\nSwitch(config-if)#switchport mode access\nSwitch(config-if)#switchport access vlan 10\n\nStep 3: Configure trunk port (connects to router/another switch)\nSwitch(config)#interface fa0/24\nSwitch(config-if)#switchport mode trunk\n\nVerify:\nshow vlan brief\nshow interfaces trunk" },

  // ── COLLISION & BROADCAST DOMAINS ──
  { cat: "Collision & Broadcast Domains", q: "Count collision domains and broadcast domains: 1 router, 2 switches, 5 PCs", a: "Scenario: Router with 2 interfaces, each connected to a switch, each switch with 5 PCs\n\nCollision Domains:\n• Each switch port = 1 collision domain (switches separate collision domains)\n• 2 switches × 5 ports each = 10 (PCs) + 2 uplinks to router = 12 collision domains total\n• (Count every active switch/router port as a separate collision domain)\n\nBroadcast Domains:\n• Each router interface = 1 broadcast domain\n• 2 router interfaces = 2 broadcast domains\n• Routers separate broadcast domains; switches do not (without VLANs)" },
  { cat: "Collision & Broadcast Domains", q: "How does a hub affect collision and broadcast domains vs a switch?", a: "Hub:\n• Creates 1 collision domain for ALL connected devices\n• All devices share the same bandwidth\n• Uses CSMA/CD to handle collisions\n• Still 1 broadcast domain (like a switch)\n\nSwitch:\n• Each port = its own collision domain\n• No collisions (full-duplex operation)\n• Still 1 broadcast domain by default (unless VLANs configured)\n• Forwards frames based on MAC address table\n\nRouter:\n• Each interface = separate collision AND broadcast domain\n• Limits both collision and broadcast propagation" },

  // ── PRACTICAL SCENARIOS & TROUBLESHOOTING ──
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: A PC cannot ping its default gateway. What are the steps to diagnose and fix this?", a: "Step-by-step diagnosis:\n\n1. Check physical connection: Is the cable plugged in? Check link light (green = connected).\n\n2. Check IP config: ipconfig (Windows) or ifconfig (Linux) – verify IP, mask, gateway are correct.\n\n3. Ping loopback: ping 127.0.0.1 – confirms TCP/IP stack is working on the PC.\n\n4. Ping own IP: ping [PC's IP] – confirms NIC is working.\n\n5. Ping gateway: ping [gateway IP] – if fails, problem is between PC and router.\n\n6. Check ARP table: arp -a – verify gateway MAC is resolved.\n\n7. Check switch: Is the port active? Is it in the correct VLAN?\n\n8. Check router interface: show interfaces fa0/0 – is it up/up?\n\nCommon fixes: correct IP config, fix physical cable, enable interface (no shutdown), correct VLAN assignment." },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: Two PCs on same switch can't ping each other. How do you diagnose?", a: "Possible causes & diagnosis:\n\n1. Wrong IP addressing:\n   → Run ipconfig on both PCs\n   → Ensure both are in same subnet\n   → Check subnet masks match\n\n2. VLAN mismatch:\n   → show vlan brief on switch\n   → Ensure both ports are in same VLAN\n\n3. Physical issues:\n   → Check cable connections\n   → Check port status: show interfaces fa0/x\n\n4. Duplex/speed mismatch:\n   → show interfaces fa0/x – look for 'input errors' and 'CRC errors'\n   → Fix: interface fa0/x → duplex full → speed 100\n\n5. ACL blocking:\n   → show access-lists – check deny counters increasing\n   → show ip interface – check which ACL applied\n\n6. Firewall on PC:\n   → Temporarily disable Windows Firewall to test" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: Users on VLAN 10 can't reach the Internet but users on VLAN 20 can. What do you check?", a: "Diagnosis steps:\n\n1. Check VLAN 10 SVI:\n   show interfaces vlan 10 – is it up/up?\n   Verify correct IP and subnet mask on SVI\n\n2. Check inter-VLAN routing:\n   show ip route – is route for VLAN 10 subnet present?\n   Confirm ip routing is enabled on Layer 3 switch\n\n3. Check trunk port:\n   show interfaces trunk – is VLAN 10 in allowed VLANs list?\n   Fix: switchport trunk allowed vlan add 10\n\n4. Check default route:\n   show ip route – is there a 0.0.0.0/0 default route?\n   Add if missing: ip route 0.0.0.0 0.0.0.0 [ISP gateway IP]\n\n5. Check ACL:\n   Is an ACL blocking VLAN 10 traffic?\n   show access-lists – check deny counters" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: A switch port keeps going into err-disabled state. What causes this and how do you fix it?", a: "Err-disabled means the switch has administratively shut down a port due to a policy violation.\n\nCommon causes:\n• Port security violation (wrong MAC address connected)\n• BPDU guard triggered (switch port received a BPDU from another switch)\n• Duplex mismatch\n• PortFast misconfiguration\n\nDiagnosis:\nshow interfaces fa0/18 – check 'err-disabled'\nshow interfaces status – shows 'err-disabled' in status column\nshow errdisable recovery – shows reason for shutdown\n\nFix:\n1. Correct the root cause (remove unauthorized device, fix STP config)\n2. Re-enable the port:\n   interface fa0/18\n   shutdown\n   no shutdown" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: Ping shows high latency and packet loss. How do you identify the problem?", a: "Diagnosis:\n\n1. Use ping with more packets:\n   ping -t [IP] (Windows) or ping -c 100 [IP] (Linux)\n   Observe % loss and ms values\n\n2. Use traceroute/tracert:\n   tracert [IP] (Windows) / traceroute [IP] (Cisco)\n   Identify which hop shows high latency or packet loss\n\n3. Check interface errors:\n   show interfaces [int] – look for:\n   • Input errors (collisions, CRC)\n   • Output drops (congestion)\n   • Runts/Giants (frame size issues)\n\n4. Check duplex:\n   Half-duplex mismatch causes collisions → high latency\n   Fix with: duplex full / speed auto\n\n5. Check bandwidth utilization:\n   show interfaces [int] – look at 'load' value\n   May need QoS or bandwidth upgrade" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: A router cannot route between two networks. What are the common causes?", a: "Check the following:\n\n1. Interface status:\n   show ip interface brief – both interfaces must be 'up/up'\n   Fix: no shutdown on interface\n\n2. IP addressing:\n   show running-config – verify correct IPs on each interface\n   Are the IPs in different subnets? (required for routing)\n\n3. Routing table:\n   show ip route – are both networks in the routing table?\n   Direct-connect networks appear as 'C' (Connected)\n   Add static route if missing: ip route [dest-net] [mask] [next-hop]\n\n4. ACL blocking:\n   show ip interface [int] – check inbound/outbound ACL\n   show access-lists – check deny counters\n\n5. NAT misconfiguration:\n   If NAT is involved, verify inside/outside interfaces are correctly marked" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: A newly connected switch is causing a switching loop and the network is flooded. What happened and how do you fix it?", a: "Cause: The new switch created a redundant path and Spanning Tree Protocol (STP) hasn't yet converged, OR STP is misconfigured/disabled.\n\nSymptoms:\n• Network flooding / broadcast storm\n• High CPU on switches\n• Intermittent connectivity\n\nDiagnosis:\nshow spanning-tree – check STP state on all ports\nshow mac address-table – entries constantly changing?\n\nFix:\n1. Enable STP (should be on by default on Cisco switches):\n   spanning-tree mode rapid-pvst\n\n2. Enable PortFast on access ports (connects end devices only):\n   interface fa0/1\n   spanning-tree portfast\n\n3. Enable BPDU Guard to protect PortFast ports:\n   spanning-tree bpduguard enable\n\n4. Disconnect redundant link temporarily until STP converges" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: Users get 169.254.x.x IP addresses. What does this mean and how do you fix it?", a: "169.254.x.x is an APIPA (Automatic Private IP Addressing) address.\nThis means the device FAILED to get an IP from a DHCP server.\n\nCauses:\n• DHCP server is down or unreachable\n• DHCP pool is exhausted (no available IPs)\n• Network connectivity between client and DHCP server broken\n• Wrong VLAN (client and DHCP server in different broadcast domains with no relay)\n\nDiagnosis:\nipconfig /all – confirm DHCP: No or APIPA address\nping [DHCP server IP] – is it reachable?\nOn router: show ip dhcp pool – check bindings and available addresses\n\nFix:\n1. Restart DHCP service on server/router\n2. Expand DHCP pool or clear old leases\n3. Add ip helper-address [DHCP server IP] on router interface if DHCP is on different subnet\n4. Run: ipconfig /release then ipconfig /renew" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "SCENARIO: You can ping an IP address but cannot access a website by domain name. What is wrong?", a: "This is a DNS resolution failure.\n\nEvidence: IP ping works (Layer 3 OK), but domain name fails (Layer 7 DNS issue)\n\nDiagnosis:\n1. Test DNS: nslookup www.google.com\n   If it fails or hangs, DNS server is unreachable or misconfigured\n\n2. Check DNS server config:\n   ipconfig /all – verify correct DNS server IP listed\n\n3. Ping DNS server:\n   ping [DNS server IP] – can you reach it?\n\n4. Check DNS server is running:\n   On Windows Server: Check DNS service in Services.msc\n\nFix:\n1. Set correct DNS server (e.g. 8.8.8.8 for Google DNS)\n2. Flush DNS cache: ipconfig /flushdns\n3. Check ACL: ensure port 53 (UDP/TCP) is not blocked\n4. Ensure DNS server is configured correctly" },
  { cat: "Fault Diagnosis & Troubleshooting", q: "What are common Cisco IOS error messages and what do they mean?", a: "% Ambiguous command – command abbreviation is not unique; type more characters\n% Incomplete command – command needs more arguments\n% Invalid input detected – wrong command syntax; ^ points to where the error occurred\nError: device or address unreachable – routing path doesn't exist or host is down\n'Request timed out' in ping – no reply (host down, ACL blocking, no route back)\n'Destination host unreachable' in ping – local device cannot reach the destination network (no route)\n!!!!!  = 100% ping success\n..... = 0% ping success (all timed out)\n.!!!! = first packet failed (ARP convergence), rest OK (normal on first ping)" },

  // ── CISCO PACKET TRACER COMMANDS ──
  { cat: "Cisco IOS Commands", q: "What are the essential Cisco IOS show commands for troubleshooting?", a: "show ip interface brief – quick status of all interfaces (IP, up/down)\nshow interfaces [int] – detailed stats (errors, speed, duplex, bandwidth)\nshow running-config – current active configuration\nshow startup-config – saved configuration in NVRAM\nshow ip route – routing table (C=connected, S=static, R=RIP, O=OSPF, D=EIGRP)\nshow vlan brief – VLAN database and port assignments\nshow mac address-table – MAC-to-port mapping on switch\nshow arp – ARP table (IP to MAC mappings)\nshow version – IOS version, uptime, memory, hardware\nshow spanning-tree – STP topology and port states\nshow access-lists – ACL rules and match counters\nshow ip dhcp pool – DHCP pool info and bindings\nshow ip protocols – routing protocol details" },
  { cat: "Cisco IOS Commands", q: "What are the Cisco IOS router configuration modes and how to navigate between them?", a: "User EXEC mode (Router>):\n→ Limited view commands only\n→ Enter: default login\n\nPrivileged EXEC mode (Router#):\n→ Full show commands, debug, copy, reload\n→ Enter: enable (or en)\n→ Exit: disable\n\nGlobal Configuration mode (Router(config)#):\n→ Configures system-wide settings\n→ Enter: configure terminal (or conf t)\n→ Exit: end or Ctrl+Z (back to Privileged), exit (back one level)\n\nInterface Configuration mode (Router(config-if)#):\n→ Enter: interface [type] [number]\n\nLine Configuration mode (Router(config-line)#):\n→ Enter: line console 0 or line vty 0 4" },
  { cat: "Cisco IOS Commands", q: "Write full Cisco IOS commands to configure a router interface with an IP address.", a: "Router>enable\nRouter#configure terminal\nRouter(config)#interface FastEthernet 0/0\nRouter(config-if)#description Connected to LAN\nRouter(config-if)#ip address 192.168.1.1 255.255.255.0\nRouter(config-if)#no shutdown\nRouter(config-if)#exit\n\nFor Serial interface (WAN):\nRouter(config)#interface Serial 0/0/0\nRouter(config-if)#ip address 10.0.0.1 255.255.255.252\nRouter(config-if)#clock rate 64000  ← (DCE side only)\nRouter(config-if)#no shutdown\n\nSave configuration:\nRouter(config)#end\nRouter#copy running-config startup-config\n(or: write memory / wr)" },
  { cat: "Cisco IOS Commands", q: "How do you configure RIP on a Cisco router?", a: "Router(config)#router rip\nRouter(config-router)#version 2\nRouter(config-router)#network 192.168.1.0\nRouter(config-router)#network 10.0.0.0\nRouter(config-router)#no auto-summary\nRouter(config-router)#end\n\nVerify:\nshow ip protocols – confirms RIP is running, networks advertised\nshow ip route – RIP routes appear with 'R'\ndebug ip rip – real-time RIP update view (use carefully)\n\nImportant:\n• no auto-summary needed for VLSM/classless routing\n• RIPv2 sends subnet info; RIPv1 does not\n• Max hop count = 15" },
  { cat: "Cisco IOS Commands", q: "How do you configure a static route and a default route on Cisco IOS?", a: "Static route (specific network):\nRouter(config)#ip route [dest-network] [subnet-mask] [next-hop-IP or exit-interface]\n\nExample:\nRouter(config)#ip route 192.168.2.0 255.255.255.0 10.0.0.2\n\nDefault route (route of last resort – for all traffic not matched):\nRouter(config)#ip route 0.0.0.0 0.0.0.0 [next-hop-IP]\n\nExample:\nRouter(config)#ip route 0.0.0.0 0.0.0.0 209.165.200.226\n\nVerify:\nshow ip route → static routes show 'S', default shows 'S*'\n'Gateway of last resort is X to network 0.0.0.0'" },
  { cat: "Cisco IOS Commands", q: "How do you configure console, VTY, and enable passwords on Cisco IOS?", a: "Enable password (unencrypted):\nRouter(config)#enable password cisco\n\nEnable secret (encrypted – preferred):\nRouter(config)#enable secret cisco123\n\nConsole password:\nRouter(config)#line console 0\nRouter(config-line)#password cisco\nRouter(config-line)#login\nRouter(config-line)#exit\n\nVTY (Telnet) password:\nRouter(config)#line vty 0 4\nRouter(config-line)#password cisco\nRouter(config-line)#login\nRouter(config-line)#exit\n\nEncrypt all plaintext passwords:\nRouter(config)#service password-encryption\n\nMOTD Banner:\nRouter(config)#banner motd $Authorized Access Only!$" },
  { cat: "Cisco IOS Commands", q: "How do you configure DHCP on a Cisco router?", a: "Step 1: Exclude static IP addresses from pool\nRouter(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.49\n\nStep 2: Create DHCP pool\nRouter(config)#ip dhcp pool LAN_POOL\nRouter(dhcp-config)#network 192.168.1.0 255.255.255.0\nRouter(dhcp-config)#default-router 192.168.1.1\nRouter(dhcp-config)#dns-server 8.8.8.8\nRouter(dhcp-config)#exit\n\nVerify:\nshow ip dhcp pool\nshow ip dhcp binding (shows assigned IPs)\nshow ip dhcp conflict\n\nFor remote DHCP (IP helper):\nRouter(config-if)#ip helper-address [DHCP server IP]" },
  { cat: "Cisco IOS Commands", q: "What are the Cisco IOS debug commands and when should you use them?", a: "debug ip rip – shows RIP routing updates in real-time\ndebug ip ospf events – OSPF adjacency events\ndebug ip icmp – shows ICMP packet info\ndebug ip packet – shows all IP packet processing\ndebug ip nat – NAT translations in real-time\ndebug spanning-tree events – STP state changes\n\nIMPORTANT WARNINGS:\n• Debug commands generate heavy output and can crash routers in production\n• Always use with caution\n• Turn off with: no debug [command] or undebug all\n• Use terminal monitor to see debug output on Telnet/SSH session\n\nPrefer: show commands first, use debug only for specific issues" },
  { cat: "Cisco IOS Commands", q: "How do you configure port security on a Cisco switch?", a: "Switch(config)#interface fa0/18\nSwitch(config-if)#switchport mode access\nSwitch(config-if)#switchport port-security\nSwitch(config-if)#switchport port-security maximum 1\nSwitch(config-if)#switchport port-security mac-address sticky\nSwitch(config-if)#switchport port-security violation shutdown\n\nViolation modes:\n• shutdown – disables port (err-disabled) – most secure\n• restrict – drops packets, logs violation\n• protect – drops packets silently\n\nVerify:\nshow port-security interface fa0/18\nshow port-security address\n\nTo re-enable an err-disabled port:\nswitch(config-if)#shutdown\nswitch(config-if)#no shutdown" },
  { cat: "Cisco IOS Commands", q: "How do you back up and restore a Cisco IOS configuration using TFTP?", a: "Back up running config to TFTP server:\nRouter#copy running-config tftp:\nAddress or name of remote host? [TFTP server IP]\nDestination filename? [router-config]\n\nRestore config from TFTP:\nRouter#copy tftp running-config\nAddress or name of remote host? [TFTP server IP]\nSource filename? [router-config]\n\nSave to NVRAM (startup config):\nRouter#copy running-config startup-config\n\nErase startup config:\nRouter#erase startup-config\nRouter#reload\n\nView flash memory:\nRouter#show flash\n\nNote: TFTP server must be reachable from router. Common in lab: Packet Tracer server with TFTP service enabled." },
  { cat: "Cisco IOS Commands", q: "How do you configure NAT overload (PAT) on a Cisco router?", a: "Step 1: Define inside and outside interfaces\nRouter(config)#interface fa0/0\nRouter(config-if)#ip nat inside\nRouter(config)#interface serial 0/0/0\nRouter(config-if)#ip nat outside\n\nStep 2: Create ACL to define inside hosts\nRouter(config)#access-list 1 permit 192.168.1.0 0.0.0.255\n\nStep 3: Configure NAT overload (PAT)\nRouter(config)#ip nat inside source list 1 interface serial 0/0/0 overload\n\nVerify:\nshow ip nat translations\nshow ip nat statistics\n\nNote: 'overload' keyword enables PAT – many-to-one translation using port numbers" },
  { cat: "Cisco IOS Commands", q: "What does show ip interface brief output tell you and how do you interpret it?", a: "Command: show ip interface brief\n\nOutput columns:\nInterface – port name (Fa0/0, Se0/0/0, Vlan1)\nIP-Address – assigned IP or 'unassigned'\nOK? – YES=IP assigned correctly\nMethod – how IP was assigned (manual, DHCP, etc.)\nStatus – Physical layer: 'up' or 'down' or 'administratively down'\nProtocol – Data Link layer: 'up' or 'down'\n\nStatus/Protocol combinations:\nup/up = fully operational ✓\nup/down = Layer 1 OK, Layer 2 problem (encapsulation mismatch, missing keepalive)\ndown/down = physical problem (cable, no signal)\nadmin down/down = interface has 'shutdown' applied → fix with 'no shutdown'" },

  // ── NETWORKING TOOLS & TOPOLOGIES ──
  { cat: "Network Topologies", q: "What are the common network topology types? Draw them mentally and describe.", a: "Bus topology:\n• All devices on a single cable (backbone)\n• One break = entire network fails\n• Cheap, simple, obsolete\n\nStar topology:\n• All devices connect to central hub/switch\n• Central device failure = network failure\n• Most common in LANs today\n\nRing topology:\n• Devices connected in a circular loop\n• Token passing for access\n• FDDI, Token Ring (obsolete)\n\nMesh topology:\n• Every device connected to every other\n• Full mesh = n(n-1)/2 connections\n• Redundant, fault-tolerant; expensive\n\nTree/Hierarchical topology:\n• Star networks connected in hierarchy\n• Used in enterprise networks\n• Scalable, easy to manage" },
  { cat: "Network Topologies", q: "Describe the Cisco 3-layer hierarchical network design model.", a: "Cisco recommends three layers for enterprise networks:\n\n1. Core Layer (Backbone):\n• High-speed switching backbone\n• Connects distribution layers\n• No packet filtering/manipulation\n• Devices: High-end routers, core switches\n\n2. Distribution Layer:\n• Routing between VLANs\n• Policy enforcement (ACLs, QoS)\n• Aggregates access layer traffic\n• Devices: Layer 3 switches, routers\n\n3. Access Layer:\n• Connects end-user devices\n• Port security, VLAN assignment\n• Devices: Layer 2 switches, WAPs\n\nBenefits: Scalability, manageability, redundancy" },
  { cat: "Network Topologies", q: "What tools are used to draw network topology diagrams?", a: "Professional/Industry tools:\n• Cisco Packet Tracer – simulate AND draw network topology (free, widely used in education)\n• GNS3 – advanced network simulator with real IOS images\n• EVE-NG – enterprise-grade network emulation\n\nDiagram-only tools:\n• Microsoft Visio – industry standard for network diagrams\n• Draw.io (diagrams.net) – free, web-based, has Cisco network icons\n• Lucidchart – collaborative diagram tool\n• Creately – easy drag-and-drop\n• yEd Graph Editor – free desktop tool\n\nIn Cisco Packet Tracer:\n• Drag devices from device panel\n• Select cable type and connect ports\n• Use 'Logical' view for diagram, 'Physical' view for rack layout" },

  // ── NIGERIAN NETWORKING CONTEXT ──
  { cat: "Nigeria Networking", q: "What are the major ISPs in Nigeria and what services do they offer?", a: "Major ISPs in Nigeria:\n\n1. MTN Nigeria – mobile data, enterprise fiber, 4G/5G\n2. Airtel Nigeria – mobile data, 4G, business solutions\n3. Glo (Globacom) – mobile data, undersea fiber (Glo-1 cable)\n4. IPNX Nigeria – fiber broadband for homes and enterprises\n5. Spectranet – 4G LTE broadband\n6. Smile Communications – 4G LTE wireless broadband\n7. Swift Networks – fiber and wireless broadband\n8. MainOne – submarine cable, data center, enterprise fiber\n9. IHS Nigeria – telecoms infrastructure (towers)\n10. Ntel – NPN (Next Generation) broadband\n\nNigeria Communication Commission (NCC) regulates all telecoms services in Nigeria." },
  { cat: "Nigeria Networking", q: "What are the key Nigerian networking regulatory bodies and standards bodies?", a: "NCC – Nigerian Communications Commission\n• Regulates all telecommunications services in Nigeria\n• Issues operating licenses\n• Sets quality of service standards\n• Consumer protection\nWebsite: www.ncc.gov.ng\n\nNGEA – Nigerian Government Enterprise Architecture\n\nNITA – National Information Technology Agency (now NITDA)\nNITDA – National Information Technology Development Agency\n• Promotes IT development\n• Regulates IT sector\nWebsite: www.nitda.gov.ng\n\nNINO – Nigerian Internet Numbers Organization\n• Manages Nigeria's IP address allocation\n\nISPAN – Internet Service Providers Association of Nigeria\n• Trade association for ISPs in Nigeria" },
  { cat: "Nigeria Networking", q: "What is the role of submarine cables in Nigeria's internet connectivity?", a: "Nigeria relies heavily on submarine (undersea fiber optic) cables for international internet bandwidth.\n\nMajor cables landing in Nigeria:\n• SAT-3/WASC – older cable, reduced capacity\n• MainOne Cable – landed 2010, connects West Africa to Europe\n• Glo-1 – Globacom's cable, connects Nigeria to UK\n• WACS (West Africa Cable System) – ACE cable\n• DARE cable – Digital Africa REsilience cable\n• 2Africa cable – Meta's project, high-capacity\n\nLanding stations:\nMainly in Lagos (Lekki, Victoria Island area)\n\nWhen submarine cables have faults:\n→ Internet speeds slow dramatically across Nigeria\n→ Latency increases significantly\n→ ISPs re-route traffic via alternate cables (failover)" },

  // ── FRAME RELAY & WAN ──
  { cat: "WAN Technologies", q: "What is Frame Relay and what commands are used to configure it?", a: "Frame Relay is a WAN packet-switching technology (Layer 2) that provides connectivity over shared network infrastructure.\n\nKey concepts:\n• DLCI (Data Link Connection Identifier) – identifies a virtual circuit\n• PVC (Permanent Virtual Circuit) – permanent logical path\n• LMI (Local Management Interface) – signaling between router and Frame Relay switch\n\nConfiguration:\nRouter(config)#interface serial 0/0/0\nRouter(config-if)#encapsulation frame-relay\nRouter(config-if)#frame-relay map ip [remote-IP] [DLCI] broadcast\n\nVerify:\nshow frame-relay map\nshow frame-relay pvc\nshow frame-relay lmi\n\nNote: Frame Relay is largely replaced by MPLS and fiber connections in modern networks." },
  { cat: "WAN Technologies", q: "What is the difference between a DCE and DTE in serial WAN connections?", a: "DTE = Data Terminal Equipment\n• The customer's equipment (router)\n• Receives clocking from DCE\n\nDCE = Data Circuit-terminating Equipment\n• The ISP's equipment (CSU/DSU, modem)\n• Provides clocking signal to DTE\n\nIn Packet Tracer labs:\n• The router connected to the DCE end of the serial cable must set clock rate\n• Command: clock rate 64000 (on DCE router only)\n• Verify: show controllers serial 0/0/0 (shows which end is DCE/DTE)\n\nIf clock rate is missing on DCE side:\n→ Interface will be up/down\n→ Layer 2 won't come up" },

  // ── ALGORITHMS ──
  { cat: "Network Algorithms", q: "What is Dijkstra's algorithm and where is it used in networking?", a: "Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative weights.\n\nUsed in: OSPF routing protocol (calculates shortest path tree)\n\nProcess:\n1. Start at source, set distance = 0; all others = infinity\n2. Visit unvisited node with smallest distance\n3. Update distances of neighbors if shorter path found\n4. Mark node as visited\n5. Repeat until all nodes visited\n\nComplexity: O(V²) basic, O(E log V) with priority queue\n\nIn OSPF:\n• Each router runs SPF (Dijkstra) independently\n• Uses link-state database (LSDB) to compute topology\n• Results in routing table entries" },
  { cat: "Network Algorithms", q: "What is the Bellman-Ford algorithm and where is it used in networking?", a: "Bellman-Ford calculates shortest paths from a source, even with negative edge weights.\n\nUsed in: RIP (Routing Information Protocol) – Distance Vector routing\n\nProcess:\n1. Initialize all distances to infinity except source (0)\n2. Relax all edges V-1 times (V = number of vertices)\n3. Check for negative-weight cycles\n\nKey difference from Dijkstra:\n• Can handle negative weights (Dijkstra cannot)\n• Slower: O(VE) vs O(E log V)\n\nIn Distance Vector routing:\n• Each router only knows about neighbors\n• Routers share routing tables with neighbors\n• Builds full view gradually ('routing by rumor')\n• Can create count-to-infinity problem (solved by split horizon, route poisoning)" },
  { cat: "Network Algorithms", q: "What is Bit Stuffing and why is it used in data communication?", a: "Bit stuffing is a technique used in data link layer framing to ensure data transparency.\n\nProblem it solves:\nFlag sequences (e.g. 01111110 in HDLC) mark frame boundaries. If user data contains the same bit pattern, it would confuse the receiver.\n\nSolution:\nAfter every five consecutive 1s in data, insert (stuff) a 0 bit.\nThe receiver removes (destuffs) the 0 after every five 1s.\n\nExample:\nOriginal: 01111110000\nStuffed: 011111 0 10000 (0 inserted after 5 ones)\n\nUsed in: HDLC, PPP protocols\n\nThis allows any bit pattern in user data without ambiguity with flag sequences." },

  // ── SECURITY & FIREWALLS ──
  { cat: "Network Security", q: "What is a firewall and what are its types?", a: "A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules.\n\nTypes:\n1. Packet Filter Firewall\n   • Inspects individual packets (IP, port, protocol)\n   • Fast but no stateful tracking\n   • Layer 3/4\n\n2. Stateful Inspection Firewall\n   • Tracks connection states\n   • Knows if packet belongs to established session\n   • More intelligent than packet filter\n\n3. Application Layer Firewall (Layer 7)\n   • Deep packet inspection\n   • Understands application protocols\n   • Can detect malware in HTTP traffic\n\n4. Next-Generation Firewall (NGFW)\n   • Combines all above + IPS, URL filtering, SSL inspection\n\nPlacement: Between Internet and internal network" },
  { cat: "Network Security", q: "What is the difference between authentication and authorization?", a: "Authentication:\n• Verifying IDENTITY – 'Who are you?'\n• Methods: username/password, biometrics, certificates, MFA\n• Example: Logging in with your credentials\n\nAuthorization:\n• Determining PERMISSIONS – 'What can you do?'\n• Controls what resources an authenticated user can access\n• Example: Admin can configure router, guest can only view\n\nAccounting (completing the AAA security model):\n• Tracking WHAT was done and WHEN\n• Audit logs\n\nCisco uses AAA (Authentication, Authorization, Accounting) for network device security:\n• TACACS+ and RADIUS are protocols used for AAA" },

  // ── WIRELESS NETWORKING ──
  { cat: "Wireless Networking", q: "What are the IEEE 802.11 wireless standards and their speeds?", a: "802.11a – 5 GHz, up to 54 Mbps (1999)\n802.11b – 2.4 GHz, up to 11 Mbps (1999)\n802.11g – 2.4 GHz, up to 54 Mbps (2003)\n802.11n (Wi-Fi 4) – 2.4/5 GHz, up to 600 Mbps (2009)\n802.11ac (Wi-Fi 5) – 5 GHz, up to 3.5 Gbps (2013)\n802.11ax (Wi-Fi 6) – 2.4/5/6 GHz, up to 9.6 Gbps (2019)\n\nFrequency bands:\n2.4 GHz: longer range, more interference (microwaves, Bluetooth)\n5 GHz: shorter range, less interference, faster\n\nChannels: Use non-overlapping channels (1, 6, 11 for 2.4 GHz)" },
  { cat: "Wireless Networking", q: "How do you configure WEP security on a Cisco wireless router? (Packet Tracer lab)", a: "On the Linksys/Wireless Router GUI:\n\n1. Open browser → navigate to router IP (e.g. 192.168.1.1)\n2. Click Wireless menu\n3. Change SSID to desired name (e.g. 'CustomerWireless')\n4. Click Save Settings\n5. Click Wireless Security submenu\n6. Security Mode: select WEP\n7. Enter Key1: e.g. 1a2b3c4d5e\n8. Click Save Settings\n\nOn the wireless client PC:\n1. Config tab → Wireless\n2. Set SSID to match router\n3. Security Mode: WEP\n4. Enter same key: 1a2b3c4d5e\n\nVerify: ping router IP from wireless PC\n\nNote: WEP is insecure – use WPA2 in real networks" },

  // ── EXAM PRACTICE ──
  { cat: "Exam Practice", q: "A network admin configures ACL 10 on a router but traffic is still flowing. What might be wrong?", a: "Possible reasons the ACL is not working:\n\n1. ACL not applied to an interface:\n   ACL must be applied to a specific interface and direction\n   Fix: ip access-group 10 in (or out) on the correct interface\n\n2. Applied on wrong interface or wrong direction:\n   Standard ACLs should be close to destination (outbound)\n   Check: show ip interface [int] – verify ACL is listed\n\n3. Permit statement before deny:\n   ACLs are processed top-down; a broad permit early may match before the deny\n\n4. Wrong network/wildcard:\n   Verify ACL matches the correct traffic\n   show access-lists – check if match counters are incrementing\n\n5. Implicit deny only affects traffic not already permitted:\n   If there's already a 'permit any' at the top, nothing is denied below it" },
  { cat: "Exam Practice", q: "What is the difference between 'enable password' and 'enable secret' on Cisco IOS?", a: "enable password [password]:\n• Stored in PLAINTEXT in the configuration file\n• Visible with show running-config\n• Less secure\n\nenable secret [password]:\n• Stored as an MD5 HASH in the configuration\n• NOT visible as plaintext in show running-config\n• Overrides enable password if both are set\n• Always preferred over enable password\n\nExample in config:\nenable password cisco → appears as: 'enable password cisco' (plaintext visible)\nenable secret cisco123 → appears as: 'enable secret 5 $1$mERr$...' (hash)\n\nBest practice: Always use 'enable secret'. Also run 'service password-encryption' to encrypt console/VTY passwords." },
  { cat: "Exam Practice", q: "What is the significance of assigning an IP address to VLAN 1 on a switch instead of a physical port?", a: "Physical switch ports (Fa0/1, etc.) operate at Layer 2 and cannot have IP addresses assigned directly (on Layer 2 switches).\n\nVLAN 1 (or any VLAN) creates a virtual Layer 3 interface (SVI) on the switch that:\n• Allows in-band management via Telnet, SSH, or HTTPS\n• The IP is used to remotely access/manage the switch\n• Does NOT forward user data – only for management traffic\n\nThis is why:\n→ ip address is assigned to 'interface vlan 1' not 'interface fa0/1'\n→ A default gateway must also be configured for remote management across networks\n\nFor data traffic, physical ports are assigned to VLANs using:\nswitchport access vlan [vlan-id]" },
  { cat: "Exam Practice", q: "What network command would you use first when a user reports 'no internet access'?", a: "Systematic top-down troubleshooting:\n\n1. ipconfig (Windows) / ifconfig (Linux)\n   → Check if IP, subnet mask, gateway, DNS are assigned correctly\n\n2. ping 127.0.0.1\n   → Verify local TCP/IP stack is functional\n\n3. ping [own IP address]\n   → Verify NIC is working\n\n4. ping [default gateway]\n   → Test connectivity to local router\n\n5. ping [external IP, e.g. 8.8.8.8]\n   → Test Layer 3 internet connectivity (bypasses DNS)\n\n6. ping www.google.com\n   → Test DNS resolution\n\n7. tracert 8.8.8.8\n   → Identify where packets stop/slow down\n\nStep 5 succeeds but Step 6 fails → DNS problem\nStep 4 fails → local network problem" },
  { cat: "Exam Practice", q: "Explain the concept of subnetting in a real-world business scenario.", a: "Scenario: ABC Company in Lagos has 4 departments:\n• IT: 28 staff\n• Sales: 14 staff\n• HR: 6 staff\n• Management: 4 staff\n\nAll given IP block: 192.168.10.0/24\n\nWithout subnetting:\n• All 254 hosts in 1 network = large broadcast domain = slow network\n\nWith VLSM subnetting:\n• IT (28 hosts): 192.168.10.0/27 → 30 usable hosts ✓\n• Sales (14 hosts): 192.168.10.32/28 → 14 usable hosts ✓\n• HR (6 hosts): 192.168.10.48/29 → 6 usable hosts ✓\n• Management (4 hosts): 192.168.10.56/29 → 6 usable hosts ✓\n\nBenefits:\n• Reduced broadcast traffic per department\n• Easier security policy per subnet\n• Efficient IP usage\n• Departments isolated for security" },
  { cat: "Exam Practice", q: "What is the difference between static routing and dynamic routing? Give pros and cons.", a: "Static Routing:\n• Manually configured by admin\n• Does NOT adapt to network changes\n• Best for small/simple networks\nPros: Simple, predictable, no routing protocol overhead, secure\nCons: No automatic failover, high admin burden in large networks\n\nDynamic Routing:\n• Router learns paths automatically using protocols (RIP, OSPF, EIGRP)\n• Adapts to topology changes automatically\n• Best for large/complex networks\nPros: Automatic failover, scalable, less admin work\nCons: Routing protocol overhead, security risk if not secured\n\nAdministrative Distance (lower = preferred):\n• Directly connected = 0\n• Static route = 1\n• EIGRP = 90\n• OSPF = 110\n• RIP = 120" },
  { cat: "Exam Practice", q: "How does ping output differ on a Cisco router vs a PC? Explain what ! and . mean.", a: "PC ping output (Windows):\n• Reply from [IP]: bytes=32 time=Xms TTL=Y\n• Or: 'Request timed out' (no reply)\n• Shows 4 packets by default\n• Success or failure stated clearly\n\nCisco IOS router ping:\n! = successful echo reply (packet received)\n. = timeout (packet not received or no route back)\nU = destination unreachable (ICMP message received)\nM = packet fragmentation required\nN = network unreachable\nH = host unreachable\n? = unknown packet type\n\nExample: !!!! = 100% success (4/5 = 80%)\n.!!!! = first failed (ARP delay), rest OK – normal on first ping\n..... = 0% success – routing/connectivity problem\n\nRouter pings 100 bytes by default (vs PC 32 bytes); sends 5 packets" },
  { cat: "Exam Practice", q: "What is the three-way handshake in TCP?", a: "The TCP three-way handshake establishes a connection before data transfer:\n\nStep 1: SYN (Synchronize)\n• Client sends SYN packet to server\n• Contains client's initial sequence number\n• 'I want to connect, my sequence starts at X'\n\nStep 2: SYN-ACK (Synchronize-Acknowledge)\n• Server responds with SYN-ACK\n• Acknowledges client's SYN (ACK = X+1)\n• Includes server's own sequence number (Y)\n• 'I got your request, I'm ready, my sequence starts at Y'\n\nStep 3: ACK (Acknowledge)\n• Client sends ACK to server (ACK = Y+1)\n• Connection established\n• Data transfer can now begin\n\nFour-way termination uses: FIN → ACK → FIN → ACK" },
];

const CATEGORIES = ["All", ...new Set(ALL_CARDS.map(c => c.cat))];

const renderAnswer = (text) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    if (!line.trim()) return React.createElement('span', { key: idx, style: { display: 'block', height: '6px' } });
    const isBullet = line.startsWith('• ') || line.startsWith('→ ');
    const isNumbered = /^\d+\./.test(line.trim());
    const isHeader = line.endsWith(':') && line.length < 50 && !line.startsWith('•');
    if (isHeader) {
      return React.createElement('span', { key: idx, style: { display: 'block', fontWeight: '700', color: 'var(--accent)', fontSize: '0.82em', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, line);
    }
    if (isBullet) {
      return React.createElement('span', { key: idx, style: { display: 'flex', gap: '6px', marginBottom: '3px', paddingLeft: '4px' } },
        React.createElement('span', { style: { color: 'var(--accent)', flexShrink: 0 } }, '▸'),
        React.createElement('span', null, line.replace(/^[•→] /, ''))
      );
    }
    if (isNumbered) {
      const match = line.match(/^(\d+\.\s*)(.*)/);
      return React.createElement('span', { key: idx, style: { display: 'flex', gap: '6px', marginBottom: '3px', paddingLeft: '4px' } },
        React.createElement('span', { style: { color: 'var(--accent)', fontFamily: 'monospace', flexShrink: 0, minWidth: '18px' } }, match[1]),
        React.createElement('span', null, match[2])
      );
    }
    const hasCode = /[#>$]|[A-Z][a-z]+\(config/.test(line);
    if (hasCode) {
      return React.createElement('span', { key: idx, style: { display: 'block', fontFamily: 'monospace', fontSize: '0.82em', background: 'var(--code-bg)', color: 'var(--code-fg)', padding: '2px 8px', borderRadius: '4px', marginBottom: '3px', borderLeft: '3px solid var(--accent)' } }, line);
    }
    return React.createElement('span', { key: idx, style: { display: 'block', marginBottom: '3px' } }, line);
  });
};

export default function SWD315Flashcards() {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownSet, setKnownSet] = useState(new Set());
  const [reviewSet, setReviewSet] = useState(new Set());
  const [deckOrder, setDeckOrder] = useState(null);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const baseDeck = activeCat === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.cat === activeCat);
  const filteredDeck = searchTerm
    ? ALL_CARDS.filter(c => c.q.toLowerCase().includes(searchTerm.toLowerCase()) || c.a.toLowerCase().includes(searchTerm.toLowerCase()))
    : baseDeck;
  const currentDeck = deckOrder ? deckOrder.filter(c => filteredDeck.includes(c)) : filteredDeck;

  const card = currentDeck[currentIndex] || currentDeck[0];
  const globalIdx = card ? ALL_CARDS.indexOf(card) : -1;

  const navigate = useCallback((dir) => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(p => (p + dir + currentDeck.length) % currentDeck.length), 150);
  }, [currentDeck.length]);

  const flipCard = useCallback(() => setIsFlipped(p => !p), []);

  const mark = useCallback((type) => {
    if (globalIdx === -1) return;
    if (type === 'know') {
      setKnownSet(s => { const n = new Set(s); n.has(globalIdx) ? n.delete(globalIdx) : n.add(globalIdx); return n; });
      setReviewSet(s => { const n = new Set(s); n.delete(globalIdx); return n; });
    } else {
      setReviewSet(s => { const n = new Set(s); n.has(globalIdx) ? n.delete(globalIdx) : n.add(globalIdx); return n; });
      setKnownSet(s => { const n = new Set(s); n.delete(globalIdx); return n; });
    }
  }, [globalIdx]);

  const shuffle = () => {
    const arr = [...filteredDeck];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDeckOrder(arr);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const reset = () => { setDeckOrder(null); setCurrentIndex(0); setIsFlipped(false); };

  const filterCat = (cat) => {
    setActiveCat(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
    setDeckOrder(null);
    setShowCatMenu(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1); }
      else if (e.key === 'k' && isFlipped) mark('know');
      else if (e.key === 'r' && isFlipped) mark('review');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [flipCard, navigate, isFlipped, mark]);

  const pct = Math.round(((currentIndex + 1) / currentDeck.length) * 100);
  const isKnown = knownSet.has(globalIdx);
  const isReview = reviewSet.has(globalIdx);

  const style = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Unbounded:wght@700;900&display=swap');
    :root {
      --bg: #0d0f1a;
      --card-bg: #141828;
      --card-front: #161c30;
      --card-back: #0f1a24;
      --border: #2a3050;
      --accent: #00d4aa;
      --accent2: #ff6b35;
      --text1: #e8eaf0;
      --text2: #8892a4;
      --text3: #5a6480;
      --know: #00d4aa;
      --review: #ff6b35;
      --code-bg: #1a2035;
      --code-fg: #7dd3fc;
      --tag-bg: #1e2540;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text1); font-family: 'Space Grotesk', sans-serif; min-height: 100vh; }
    .app { min-height: 100vh; display: flex; flex-direction: column; }
    .header { padding: 16px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .logo { font-family: 'Unbounded', sans-serif; font-size: 1rem; font-weight: 900; color: var(--accent); letter-spacing: -0.02em; }
    .logo span { color: var(--text2); font-weight: 400; font-size: 0.75em; }
    .search-bar { flex: 1; max-width: 300px; background: var(--tag-bg); border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; color: var(--text1); font-size: 0.85em; font-family: inherit; outline: none; }
    .search-bar::placeholder { color: var(--text3); }
    .search-bar:focus { border-color: var(--accent); }
    .stats { display: flex; gap: 12px; }
    .stat-chip { background: var(--tag-bg); border: 1px solid var(--border); border-radius: 20px; padding: 4px 10px; font-size: 0.78em; color: var(--text2); }
    .stat-chip.know { border-color: var(--know); color: var(--know); }
    .stat-chip.review { border-color: var(--review); color: var(--review); }
    .main { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 24px 16px; gap: 20px; max-width: 900px; margin: 0 auto; width: 100%; }
    .cat-bar { width: 100%; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .cat-toggle { background: var(--tag-bg); border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; font-size: 0.8em; color: var(--text2); cursor: pointer; font-family: inherit; }
    .cat-toggle:hover { border-color: var(--accent); color: var(--accent); }
    .cat-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .cat-pill { background: var(--tag-bg); border: 1px solid var(--border); border-radius: 20px; padding: 5px 12px; font-size: 0.78em; color: var(--text2); cursor: pointer; transition: all 0.2s; white-space: nowrap; }
    .cat-pill:hover, .cat-pill.active { background: var(--accent); color: #000; border-color: var(--accent); font-weight: 700; }
    .progress-wrap { width: 100%; display: flex; align-items: center; gap: 12px; }
    .progress-bar { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #00a8ff); border-radius: 2px; transition: width 0.3s ease; }
    .progress-txt { font-size: 0.78em; color: var(--text2); white-space: nowrap; font-family: 'JetBrains Mono', monospace; }
    .card-wrap { width: 100%; perspective: 1200px; cursor: pointer; }
    .card-inner { position: relative; width: 100%; min-height: 340px; transform-style: preserve-3d; transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1); }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; min-height: 340px; backface-visibility: hidden; border-radius: 16px; border: 1px solid var(--border); padding: 32px; display: flex; flex-direction: column; }
    .card-front { background: var(--card-front); }
    .card-back { background: var(--card-back); transform: rotateY(180deg); border-color: var(--accent); border-width: 1px; }
    .card-label { font-size: 0.7em; font-family: 'JetBrains Mono', monospace; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
    .card-back .card-label { color: var(--accent2); }
    .card-cat { font-size: 0.72em; background: var(--tag-bg); color: var(--text2); padding: 3px 10px; border-radius: 20px; border: 1px solid var(--border); display: inline-block; margin-bottom: 20px; align-self: flex-start; }
    .card-q { font-size: 1.1em; font-weight: 600; color: var(--text1); line-height: 1.55; flex: 1; }
    .card-a { font-size: 0.9em; color: var(--text1); line-height: 1.65; flex: 1; overflow-y: auto; max-height: 280px; }
    .card-a::-webkit-scrollbar { width: 4px; }
    .card-a::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .card-hint { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 0.72em; color: var(--text3); text-align: center; }
    .controls { display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; }
    .btn { border: 1px solid var(--border); border-radius: 10px; padding: 9px 18px; font-size: 0.85em; font-family: inherit; cursor: pointer; transition: all 0.18s; font-weight: 600; }
    .btn-nav { background: var(--tag-bg); color: var(--text1); }
    .btn-nav:hover { border-color: var(--accent); color: var(--accent); }
    .btn-flip { background: var(--accent); color: #000; border-color: var(--accent); padding: 9px 28px; }
    .btn-flip:hover { background: #00f5c0; }
    .btn-know { background: transparent; color: var(--know); border-color: var(--know); }
    .btn-know.active, .btn-know:hover { background: var(--know); color: #000; }
    .btn-review { background: transparent; color: var(--review); border-color: var(--review); }
    .btn-review.active, .btn-review:hover { background: var(--review); color: #fff; }
    .btn-shuffle { background: var(--tag-bg); color: var(--text2); border-color: var(--border); }
    .btn-shuffle:hover { color: var(--accent); border-color: var(--accent); }
    .kbd { font-size: 0.65em; background: var(--tag-bg); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; font-family: 'JetBrains Mono', monospace; color: var(--text3); margin-left: 4px; }
    .topology-hint { width: 100%; background: var(--tag-bg); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; font-size: 0.78em; color: var(--text2); text-align: center; }
    .topology-hint a { color: var(--accent); text-decoration: none; }
    .topology-hint a:hover { text-decoration: underline; }
    @media (max-width: 600px) {
      .header { padding: 12px 16px; }
      .main { padding: 16px 12px; }
      .card-face { padding: 20px; min-height: 280px; }
      .card-q { font-size: 1em; }
      .card-a { font-size: 0.85em; max-height: 240px; }
    }
  `;

  return React.createElement('div', { className: 'app' },
    React.createElement('style', null, style),

    // Header
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'logo' }, 'SWD315 ', React.createElement('span', null, 'Data Communication')),
      React.createElement('input', {
        className: 'search-bar',
        placeholder: '🔍 Search questions...',
        value: searchTerm,
        onChange: e => { setSearchTerm(e.target.value); setCurrentIndex(0); setIsFlipped(false); setDeckOrder(null); }
      }),
      React.createElement('div', { className: 'stats' },
        React.createElement('div', { className: 'stat-chip' }, `${ALL_CARDS.length} cards`),
        knownSet.size > 0 && React.createElement('div', { className: 'stat-chip know' }, `✓ ${knownSet.size}`),
        reviewSet.size > 0 && React.createElement('div', { className: 'stat-chip review' }, `↺ ${reviewSet.size}`)
      )
    ),

    // Main
    React.createElement('main', { className: 'main' },

      // Category pills
      React.createElement('div', { className: 'cat-bar' },
        React.createElement('button', { className: 'cat-toggle', onClick: () => setShowCatMenu(p => !p) }, showCatMenu ? '▲ Topics' : '▼ Topics'),
        showCatMenu && React.createElement('div', { className: 'cat-pills' },
          CATEGORIES.map(cat =>
            React.createElement('button', {
              key: cat,
              className: `cat-pill ${activeCat === cat ? 'active' : ''}`,
              onClick: () => filterCat(cat)
            }, cat)
          )
        )
      ),

      // Progress
      React.createElement('div', { className: 'progress-wrap' },
        React.createElement('div', { className: 'progress-bar' },
          React.createElement('div', { className: 'progress-fill', style: { width: `${pct}%` } })
        ),
        React.createElement('span', { className: 'progress-txt' }, `${currentIndex + 1} / ${currentDeck.length}`)
      ),

      // Card
      card && React.createElement('div', { className: 'card-wrap', onClick: flipCard },
        React.createElement('div', { className: `card-inner ${isFlipped ? 'flipped' : ''}` },
          // Front
          React.createElement('div', { className: 'card-face card-front' },
            React.createElement('div', { className: 'card-label' }, '❓ Question'),
            React.createElement('span', { className: 'card-cat' }, card.cat),
            React.createElement('p', { className: 'card-q' }, card.q),
            React.createElement('div', { className: 'card-hint' }, 'Click or press Space to reveal answer')
          ),
          // Back
          React.createElement('div', { className: 'card-face card-back' },
            React.createElement('div', { className: 'card-label' }, '✅ Answer'),
            React.createElement('span', { className: 'card-cat' }, card.cat),
            React.createElement('div', { className: 'card-a' }, renderAnswer(card.a)),
            React.createElement('div', { className: 'card-hint' }, React.createElement('kbd', { className: 'kbd' }, 'K'), ' = Know it  ', React.createElement('kbd', { className: 'kbd' }, 'R'), ' = Review later')
          )
        )
      ),

      // Controls
      React.createElement('div', { className: 'controls' },
        React.createElement('button', { className: 'btn btn-nav', onClick: () => navigate(-1) }, '← Prev'),
        React.createElement('button', { className: 'btn btn-flip', onClick: flipCard }, isFlipped ? 'Show Question' : 'Reveal Answer'),
        React.createElement('button', { className: 'btn btn-nav', onClick: () => navigate(1) }, 'Next →')
      ),
      isFlipped && React.createElement('div', { className: 'controls' },
        React.createElement('button', { className: `btn btn-know ${isKnown ? 'active' : ''}`, onClick: () => mark('know') }, isKnown ? '✓ Known' : '✓ I Know This'),
        React.createElement('button', { className: `btn btn-review ${isReview ? 'active' : ''}`, onClick: () => mark('review') }, isReview ? '↺ Marked' : '↺ Review Later')
      ),
      React.createElement('div', { className: 'controls' },
        React.createElement('button', { className: 'btn btn-shuffle', onClick: shuffle }, '🔀 Shuffle'),
        React.createElement('button', { className: 'btn btn-shuffle', onClick: reset }, '↺ Reset Order')
      ),

      // Topology tools hint
      React.createElement('div', { className: 'topology-hint' },
        '🗺️ For network topology diagrams: Use ',
        React.createElement('a', { href: 'https://www.netacad.com/courses/packet-tracer', target: '_blank', rel: 'noreferrer' }, 'Cisco Packet Tracer'),
        ' (free) or ',
        React.createElement('a', { href: 'https://app.diagrams.net', target: '_blank', rel: 'noreferrer' }, 'draw.io'),
        ' (free, browser-based with Cisco network icons) to practice topology drawing'
      )
    )
  );
}
