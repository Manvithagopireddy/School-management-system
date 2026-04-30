package com.school.management.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CampusMapService {

    private static class Node implements Comparable<Node> {
        String name;
        int distance;
        Node(String name, int distance) { this.name = name; this.distance = distance; }
        @Override
        public int compareTo(Node other) { return Integer.compare(this.distance, other.distance); }
    }

    private final Map<String, Map<String, Integer>> graph = new HashMap<>();

    public CampusMapService() {
        // Initialize mock graph of school buildings
        addEdge("Main Block", "Library", 5);
        addEdge("Main Block", "Lab A", 10);
        addEdge("Library", "Science Block", 3);
        addEdge("Lab A", "Science Block", 8);
        addEdge("Science Block", "Canteen", 12);
        addEdge("Library", "Canteen", 15);
    }

    private void addEdge(String u, String v, int weight) {
        graph.computeIfAbsent(u, k -> new HashMap<>()).put(v, weight);
        graph.computeIfAbsent(v, k -> new HashMap<>()).put(u, weight);
    }

    /**
     * Algorithm: Dijkstra's Shortest Path
     * Finds the shortest distance between two points on campus.
     */
    public Map<String, Object> getShortestPath(String start, String end) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        Map<String, Integer> dist = new HashMap<>();
        Map<String, String> prev = new HashMap<>();
        
        for (String node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
        
        dist.put(start, 0);
        pq.add(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            if (curr.name.equals(end)) break;
            if (curr.distance > dist.get(curr.name)) continue;

            for (Map.Entry<String, Integer> neighbor : graph.getOrDefault(curr.name, Collections.emptyMap()).entrySet()) {
                int newDist = dist.get(curr.name) + neighbor.getValue();
                if (newDist < dist.get(neighbor.getKey())) {
                    dist.put(neighbor.getKey(), newDist);
                    prev.put(neighbor.getKey(), curr.name);
                    pq.add(new Node(neighbor.getKey(), newDist));
                }
            }
        }

        List<String> path = new ArrayList<>();
        for (String at = end; at != null; at = prev.get(at)) path.add(at);
        Collections.reverse(path);

        Map<String, Object> response = new HashMap<>();
        response.put("path", path);
        response.put("distance", dist.get(end));
        return response;
    }
}
