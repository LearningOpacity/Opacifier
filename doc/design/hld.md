# High Level Design
The Secure Gateway is split into three components: Request Receiver, Coordinator, Third Party Querier.

The Request Receiver is responsible for proving a secure endpoints and recieving request from clients. It passes the request information to the Coordinator.

The Coordinator is responsible for validating the request, logging request successes and failures (to the Data Store), and sending the requests to the Third Party Querier.

The Third Party Querier is responsible for sending queries to 3rd party data sources and recieving the responses (including managing a request timeout).


## Diagrams
### Component Diagram
![Component Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/LearningOpacity/Opacifier/DesignPhase/doc/design/hld-component-diagram?changethistoupdate=1)

### Sequence Diagram
![Sequence Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/LearningOpacity/Opacifier/DesignPhase/doc/design/hld-sequence-diagram?changethistoupdate=2)