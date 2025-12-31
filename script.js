document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset for fixed header
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Course Card Interaction
    const perceptronCard = document.querySelector('.course-card[data-course="perceptron"]');
    if (perceptronCard) {
        perceptronCard.addEventListener('click', () => {
            // Scroll to the App Demo section
            const appDemo = document.querySelector('.app-demo');
            appDemo.scrollIntoView({ behavior: 'smooth' });

            // Highlight the card with border
            perceptronCard.style.transition = 'border 0.3s';
            perceptronCard.style.border = '2px solid var(--accent-color)';

            setTimeout(() => {
                perceptronCard.style.border = '';
            }, 500);
        });
    }

    // Inject Perceptron Code
    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
        codeContent.innerHTML = `
<pre><code class="language-python"><span class="comment"># ... (imports and init)</span>

<span class="keyword">def</span> <span class="function">train_model</span>(<span class="keyword">self</span>, features, labels):
    <span class="keyword">while</span> <span class="keyword">True</span>:
        mistakes = <span class="number">0</span>
        <span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(features.shape[<span class="number">0</span>]):
            inner_product = features[i] @ weight_vector
            is_wrong = inner_product * labels[i]
            
            <span class="keyword">if</span> is_wrong <= <span class="number">0</span>:
                mistakes += <span class="number">1</span>
                weight_vector += labels[i] * features[i]
        
        <span class="keyword">if</span> mistakes == <span class="number">0</span>:
            <span class="keyword">break</span>

<span class="comment">#...(evaluation code)</span>
</code></pre>`;
    }

    // Add hover effects to all course cards
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.dataset.course) {
                // Generic click for other cards
                card.style.transition = 'border 0.3s';
                card.style.border = '2px solid var(--accent-color)';
                setTimeout(() => {
                    card.style.border = '';
                }, 300);
            }
        });
    });
});

// Workflow tab switching
function switchWorkflowTab(event, tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Show corresponding content
    document.getElementById(tabName + '-tab').classList.add('active');
}
